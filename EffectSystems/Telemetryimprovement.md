## Practical roadmap for “effect-flavoured” distributed tracing  
_Target languages: TypeScript (Node) &/or modern C++17/20.  Trace viewer: **Perfetto**.  Tracing API: **OpenTelemetry** (OTLP) + Perfetto bridge._

---

### 0. Outcome you want

“Whenever any piece of work runs – HTTP call, SQLite write, job hopping threads, UI callback – I can:

* see it as a coloured **span** in Perfetto,
* follow parent ↔ child relationships across `await`/thread hops,
* correlate errors with the span that caused them,
* have near-zero code in the hot path except a couple of helpers.”

Everything that follows is geared toward that end.

---

### 1. Pick a single **context carrier**

| Runtime                  | Recommended carrier                               | Why                                |
|--------------------------|---------------------------------------------------|------------------------------------|
| Node ≥ 14               | `AsyncLocalStorage` (`async_hooks`)               | Official OTEL impl uses it; keeps ctx across `await` |
| Browser / zone.js stack  | `Zone.current.get('traceCtx')`                    | Same idea, works inside micro-tasks |
| C++ (thread pool / coroutines) | `class TraceContext {…};` kept in a `thread_local` *and* passed by value | cheapest & portable |

Make this **the only source of truth** for “current span”.

---

### 2. Declare a tiny _capability_ interface

(Effect-style but no new framework.)

```ts
// TypeScript
export interface Tracing {
  startSpan(name: string, attrs?: Attr): Span;
}

export interface Span {
  addEvent(evt: string, attrs?: Attr): void;
  recordException(err: unknown): void;
  end(status?: 'ok' | 'error');
}
```

```cpp
// C++
struct Span {
  virtual void add_event(std::string_view, Attr)=0;
  virtual void record_exception(std::exception_ptr)=0;
  virtual void end(Status)=0;
  virtual ~Span() = default;
};
struct Tracer { virtual std::unique_ptr<Span> start_span(std::string_view, Attr)=0; };
```

1. Provide a **Prod** implementation backed by OpenTelemetry SDK.  
2. Provide a **No-op** implementation for benchmarks / tests.

Inject `Tracer&` everywhere instead of calling static singletons → pure functions stay pure, tests can stub.

---

### 3. Wrap every *effect* once

Think of these wrappers as your “effect constructors”; every real side-effect goes through them.

```ts
export async function tracedFetch(
  tracer: Tracing, url: string, opts?: RequestInit
) {
  const span = tracer.startSpan('http.fetch', {url});
  try {
    const res = await fetch(url, opts);
    span.addEvent('status', {code: res.status});
    return res;
  } catch (e) {
    span.recordException(e);
    throw e;
  } finally {
    span.end();
  }
}
```

Same pattern for:

* `tracedReadFile`
* `tracedSqlQuery`
* `tracedThreadPool.submit`

Soon 90 % of your I/O is already emitting spans without polluting business logic.

---

### 4. **Context propagation helpers**

#### 4.1 Node / TS

```ts
import { AsyncLocalStorage } from 'async_hooks';
const asyncCtx = new AsyncLocalStorage<Span>();

export function withSpan<T>(span: Span, f: () => Promise<T>): Promise<T> {
  return asyncCtx.run(span, f);
}

export function currentSpan(): Span | undefined {
  return asyncCtx.getStore();
}
```

*Inside the wrapper above* do

```ts
return withSpan(span, async () => {
  // run user code WITH the span stored
});
```

#### 4.2 C++

```cpp
thread_local Span* tls_current = nullptr;

template<class F>
auto with_span(Span& s, F&& f)
    -> decltype(f())           // generic lambda
{
    struct Guard { Span*& slot; Span* prev; ~Guard(){ slot=prev;} }
    g{tls_current, tls_current};
    tls_current = &s;
    return f();
}
Span* current_span() { return tls_current; }
```

For coroutines/Futures store the pointer in the task object and restore it when resumed.  
Most thread pools expose hooks (`beforeExecute` / `afterExecute`) you can patch once.

---

### 5. Instrument the **scheduler**

Perfetto shows scheduling if you emit the right track events:

1. Tag the **queueing** site:

   ```cpp
   span->add_event("queued", {{"thread", this_id}});
   ```

2. Inside the pool worker wrap the task:

   ```cpp
   TRACE_EVENT_BEGIN("Scheduler", "Task", ctx_id);
   with_span(*parentSpan, [&]{ task(); });
   TRACE_EVENT_END("Scheduler");
   ```

   * `TRACE_EVENT_*` are macros from Perfetto’s SDK or Chromium’s base/trace_event.h.  
   * `ctx_id` is the OTEL `SpanId`; Perfetto stitches tracks with same id → flame chart across threads.

3. For Node’s libuv thread-pool you cannot change the C side, but you can:

   * wrap `fs.*`, `dns.*`, etc. like in step 3;  
   * enable the OTEL **instrumentation-fs**, **instrumentation-http** packages – they already emit `SpanLink` events for the work posted to libuv’s `uv_thread_pool_queue_work`.

Result: you’ll literally see a “Scheduler” swimlane per worker thread plus arrows from parent to child.

---

### 6. Bubble up **errors** automatically

Hook your global error boundary once and convert to span status:

TS:

```ts
process.on('unhandledRejection', err => currentSpan()?.recordException(err));
process.on('uncaughtException',  err => currentSpan()?.recordException(err));
```

C++:

```cpp
try {
    task();
} catch(...) {
    if(auto* s=current_span()) s->record_exception(std::current_exception());
    throw;
}
```

Perfetto will overlay a red bar on the failing span.

---

### 7. Export OTLP → Perfetto

1. OTEL exporter:  
   * TS: `@opentelemetry/exporter-trace-otlp-proto`.  
   * C++: `opentelemetry-exporter-otlp`.  

2. Run `otelcol` locally with:

```yaml
receivers: { otlp: { protocols: { grpc: { } } } }
exporters: { file/perf: { path: traces.pftrace, format: perfetto } }
service:
  pipelines:
    traces: { receivers: [otlp], exporters: [file/perf] }
```

3. Open `traces.pftrace` in ui.perfetto.dev → flame chart with spans + per-thread scheduling.

---

### 8. Roll-out order (minimise code churn)

1. Create `Tracer` interface & no-op impl → commit.  
2. Instrument leaf effects (`fetch`, file IO, thread-pool submit).  
3. Add context carrier + `withSpan` utilities.  
4. Replace top-level error handlers to log into spans.  
5. Wire OTLP exporter + collector; verify in Perfetto.  
6. Gradually wrap higher-level functions with `tracer.startSpan("XYZ")` as you touch them.  
7. Delete old ad-hoc logging once dashboards replicate the info.

Each step is safe, reversible, and keeps code compiling.

---

### 9. Cheat-sheet

Concept -> Code idiom  
• Span start/stop -> wrapper function returning/`unique_ptr<Span>` RAII.  
• Propagation across `await` -> `AsyncLocalStorage` / `thread_local`.  
• Thread pool hop -> capture parent `SpanId`, emit `TRACE_EVENT_*` with same id.  
• Error -> `span.recordException(e)` in one place.  
• Visual correlation -> export OTLP → Perfetto file/stream.

---

### 10. Where to read more

* OpenTelemetry Spec § Context Propagation & § Baggage  
* perfetto.dev/docs/instrumentation/tracing-sdk  
* “Tracing Async Operations in Node.js with AsyncLocalStorage” (blog)  
* Facebook Folly’s `RequestContext` (good C++ reference impl)  

You now have a plan that:

1. Uses effect-style wrappers instead of an invasive framework,  
2. Piggybacks on OTEL so any backend works,  
3. Produces a single `.pftrace` you can open in Perfetto for both “flame chart” **and** OS-scheduler lanes.

Happy tracing!