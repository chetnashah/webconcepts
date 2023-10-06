
### Hub

Hub is a central point that SDKs use to route an event to Sentry.
When `init()` is called, a a client and a blank scope are created in it.

A Hub is associated with current thread and will internally hold a stack
of scopes.

Useful methods on `Hub` interface:
```ts
  /**
   * This binds the given client to the current scope.
   * @param client An SDK client (client) instance.
   */
  bindClient(client?: Client): void;

  pushScope(): Scope;
  /** Returns the client of the top stack. */
  getClient(): Client | undefined;

  /** Returns the scope of the top stack */
  getScope(): Scope;

  // user methods
  captureException(exception: any, hint?: EventHint): string;
  captureMessage(
    message: string,
    // eslint-disable-next-line deprecation/deprecation
    level?: Severity | SeverityLevel,
    hint?: EventHint,
  ): string;
  addBreadcrumb(breadcrumb: Breadcrumb, hint?: BreadcrumbHint): void;

  /** Returns the integration if installed on the current client. */
  getIntegration<T extends Integration>(integration: IntegrationClass<T>): T | null;

  // transactions
  startTransaction(context: TransactionContext, customSamplingContext?: CustomSamplingContext): Transaction;

  // session stuff
    /**
   * Starts a new `Session`, sets on the current scope and returns it.
   *
   * To finish a `session`, it has to be passed directly to `client.captureSession`, which is done automatically
   * when using `hub.endSession()` for the session currently stored on the scope.
   *
   * When there's already an existing session on the scope, it'll be automatically ended.
   *
   * @param context Optional properties of the new `Session`.
   *
   * @returns The session which was just started
   */
  startSession(context?: Session): Session;

  /**
   * Ends the session that lives on the current scope and sends it to Sentry
   */
  endSession(): void;

  /**
   * Sends the current session on the scope to Sentry
   * @param endSession If set the session will be marked as exited and removed from the scope
   */
  captureSession(endSession?: boolean): void;
```

### Integrations

Integrations are optional plugins/features that can be turned on or off.
e.g. TracingIntegration, ScreenShotIntegration etc.

some of them are:
1. Breadcrumbs
2. Dedupe
3. HttpContext
4. LinkedErrors
4. BrowserTracing
5. Replay
6. CaptureConsole
7. ContextLines
8. Debug
9. ExtraErrorData
10. RewriteFrames
11. CustomIntegrations  -

#### Write your own Integration 

Confirm to `Integration` interface and implement `setupOnce` and `processEvent`.
```ts
import type { Client } from './client';
import type { Event, EventHint } from './event';
import type { EventProcessor } from './eventprocessor';
import type { Hub } from './hub';

/** Integration Class Interface */
export interface IntegrationClass<T> {
  /**
   * Property that holds the integration name
   */
  id: string;

  new (...args: any[]): T;
}

/** Integration interface */
export interface Integration {
  /**
   * Returns {@link IntegrationClass.id}
   */
  name: string;

  /**
   * Sets the integration up only once.
   * This takes no options on purpose, options should be passed in the constructor
   */
  setupOnce(addGlobalEventProcessor: (callback: EventProcessor) => void, getCurrentHub: () => Hub): void;

  /**
   * An optional hook that allows to preprocess an event _before_ it is passed to all other event processors.
   */
  preprocessEvent?(event: Event, hint: EventHint | undefined, client: Client): void;

  /**
   * An optional hook that allows to process an event.
   * Return `null` to drop the event, or mutate the event & return it.
   * This receives the client that the integration was installed for as third argument.
   */
  processEvent?(event: Event, hint: EventHint | undefined, client: Client): Event | null | PromiseLike<Event | null>;
}
```

### Scope

A scope contains useful info that should be sent along with event (Also known as tags and contexts),
e.g. `contexts` or `breadcrumbs` are stored in scope.

When a scope is pushed, it inherits all data from parent scope,
and when pops, all modifications are reverted.
default SDK create and destroy scopes intelligently e.g. around routes and controllers.

### Client
It is the entity that builds events by applying scope and forwards it to transport.

### Tags

Tags are k/v pairs that are indexable and searchable. 
Useful for knowing distribution etc.

### Context

Custom context allow you to attach arbitrary data(strings, lists, dictionaries) to an event.

Typically you would want user info and environment atleast.

Device context: device info
OS Context: OS info
Runtime context
App Context: Things like app-id, app-name, app-version

### Session

A timespan of relevant events 

```ts
export interface Session {
  sid: string;
  did?: string | number;
  init: boolean;
  // seconds since the UNIX epoch
  timestamp: number;
  // seconds since the UNIX epoch
  started: number;
  duration?: number;
  status: SessionStatus;
  release?: string;
  environment?: string;
  userAgent?: string;
  ipAddress?: string;
  errors: number;
  user?: User | null;
  ignoreDuration: boolean;

  /**
   * Overrides default JSON serialization of the Session because
   * the Sentry servers expect a slightly different schema of a session
   * which is described in the interface @see SerializedSession in this file.
   *
   * @return a Sentry-backend conforming JSON object of the session
   */
  toJSON(): SerializedSession;
}
```


## SpanContext (Any duration for an event)

Holds some duration, optional data, and parent span.
```ts
/** Interface holding all properties that can be set on a Span on creation. */
export interface SpanContext {
  description?: string;
  name?: string;

  /**
   * Operation of the Span.
   */
  op?: string;

  status?: string;
  parentSpanId?: string;
  spanId?: string;
  traceId?: string;
  tags?: { [key: string]: Primitive };

  /**
   * Data of the Span.
   */
  data?: { [key: string]: any };

  startTimestamp?: number;
  endTimestamp?: number;
  /**
   * The instrumenter that created this span.
   */
  instrumenter?: Instrumenter;

  /**
   * The origin of the span, giving context about what created the span.
   */
  origin?: SpanOrigin;
}
```

### span

`SpanContext` but with mandatory `traceId` and `spanId`.

