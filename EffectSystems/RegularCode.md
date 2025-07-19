# Writing “Effect-Style” Code in Plain TypeScript & C++

You don’t need ZIO, Cats-Effect, or Koka to get most of the benefits of an effect system.  
The trick is to 1) **make every capability an explicit dependency** and 2) **pass it in as a value** rather than reaching for globals.  
Below are practical patterns you can apply today with nothing more than the standard libraries.

---

## 1. General Guidelines

1. Identify the side-effects your module needs (clock, logger, random, DB, HTTP, …).  
2. Describe each effect as a *small interface* (“capability”).  
3. Accept those capabilities as arguments (constructor param, higher-order fn, template param).  
4. Keep core functions pure; let them *return* values instead of performing effects directly.  
5. Convert exceptions / error codes into a `Result`/`expected<T,E>` value so failures are explicit.  
6. Interpret the effects only at the program edge (`main`, an HTTP handler, CLI entry point).

---

## 2. TypeScript Walk-Through

### 2.1 Define Capability Interfaces

```ts
export interface Clock  { now(): number }                 // pure Unix epoch
export interface Http   { get(url: string): Promise<string> }
export interface Logger { info(msg: string): void }
```

You can bundle them into an `Env` type:

```ts
export type Env = Clock & Http & Logger;
```

### 2.2 Business Logic as a Reader-like Function

```ts
export const fetchUser =
  (username: string) =>
  async (env: Env): Promise<User> => {

    const raw  = await env.get(`/users/${username}`);
    const user = JSON.parse(raw) as User;

    env.info(`Fetched ${user.name}`);

    const age = Math.floor((env.now() - Date.parse(user.birth)) / YEAR_MS);
    return { ...user, age };
  };
```

* `fetchUser` itself is **pure** – it merely *describes* what has to happen.  
* The `Env` parameter is hidden inside a closure, exactly like the `Reader` monad.

### 2.3 Interpreters

```ts
/* production */
const liveEnv: Env = {
  now   : () => Date.now(),
  get   : (url) => fetch(url).then(r => r.text()),
  info  : console.log
};

/* test */
const testEnv: Env = {
  now  : () => 0,                                 // deterministic
  get  : async (_) => JSON.stringify(fakeUser),   // stub
  info : () => {}                                 // no-op
};
```

Usage:

```ts
const user = await fetchUser("alice")(liveEnv);  // prod
const testUser = await fetchUser("alice")(testEnv); // unit test
```

No frameworks, no decorators, no `sinon` needed.

---

## 3. C++17/20 Walk-Through

### 3.1 Capability Concepts / Interfaces

```cpp
struct Clock {
    virtual std::chrono::system_clock::time_point now() const = 0;
    virtual ~Clock() = default;
};

struct Http {
    virtual tl::expected<std::string, std::string>   // <T, E>
    get(std::string_view url) = 0;
    virtual ~Http() = default;
};

struct Logger {
    virtual void info(std::string_view msg) = 0;
    virtual ~Logger() = default;
};
```

### 3.2 Aggregate Environment

```cpp
struct Env {
    Clock&  clock;
    Http&   http;
    Logger& logger;
};
```

### 3.3 Pure Business Logic

```cpp
tl::expected<User,std::string>
fetch_user(std::string_view username, Env& env)
{
    auto resp = env.http.get("/users/" + std::string(username));
    if (!resp) return tl::make_unexpected(resp.error());

    User user = parse_user(*resp);
    env.logger.info("Fetched " + user.name);

    using namespace std::chrono;
    user.age = duration_cast<years>(
        env.clock.now() - user.birth).count();
    return user;
}
```

Everything that might fail is reflected in the return type `expected<User, string>`.

### 3.4 Interpreters

```cpp
/* production ------------------------------------------------------*/
struct SystemClock : Clock {
    auto now() const -> time_point<system_clock> override {
        return system_clock::now();
    }
};

struct CurlHttp : Http {
    auto get(std::string_view url)
      -> tl::expected<std::string,std::string> override
    { /* curl here … */ }
};

struct StdoutLogger : Logger {
    void info(std::string_view m) override { std::cout << m << '\n'; }
};

/* test ------------------------------------------------------------*/
struct FrozenClock : Clock {
    time_point<system_clock> t0;
    FrozenClock() : t0(system_clock::from_time_t(0)) {}
    auto now() const -> time_point<system_clock> override { return t0; }
};

struct StubHttp : Http {
    auto get(std::string_view)
      -> tl::expected<std::string,std::string> override
    { return fake_json; }
};

struct SilentLogger : Logger { void info(std::string_view) override {} };
```

```cpp
SystemClock   clk;
CurlHttp      http;
StdoutLogger  log;
Env prod{clk, http, log};

FrozenClock fclk;
StubHttp    fhttp;
SilentLogger slog;
Env test{fclk, fhttp, slog};
```

Now:

```cpp
auto user = fetch_user("alice", prod);   // prod path
auto u2   = fetch_user("alice", test);   // deterministic test
```

---

## 4. Extra Patterns (Optional, No Libraries Required)

1. **Free / Variant-based DSL**  
   * Create a sum‐type `struct Get { std::string url; };` etc.  
   * A program is `std::vector<Effect>`; interpret it later.

2. **Tagless-final (interface of abstract operations)**  
   * Template the program on a trait `template<class F> struct Algebra`.

3. **Continuation-passing / async**  
   * Return `std::function<void(Callback)>` or `Promise<T>` so the caller decides when to run.

4. **Policy-based design (C++)**  
   * Make effects template parameters: `template<class Clock, class Http, class Log> auto fetch_user(...)`.

All are merely formalizations of the same idea: “**Pass the effect in, do not perform it here.**”

---

## 5. Mental Checklist

✔ No function with a “nice” signature secretly writes to a file.  
✔ All dependencies arrive through parameters, not singletons.  
✔ Every failure path is a value (`Result`, `expected`).  
✔ Tests supply stubs by ordinary object construction—no mocking frameworks.  
✔ The real world touches the code in exactly one place: the interpreter.

Follow that recipe and you’ll have effect-style code, compiler‐checked, in vanilla TypeScript or C++.