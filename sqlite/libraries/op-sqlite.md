## op-sqlite Architecture Overview

### Arch 1

```mermaid
graph TB
    subgraph "JavaScript Layer"
        API[Main API<br/>src/index.ts]
        Storage[Storage<br/>src/Storage.ts]
        Types[TypeScript Types<br/>Scalar, QueryResult, DB]
    end
    
    subgraph "React Native Bridge"
        NativeModule[NativeOPSQLite<br/>TurboModule]
        JSI[JSI Installation<br/>__OPSQLiteProxy]
    end
    
    subgraph "C++ Core Layer"
        Bindings[bindings.cpp/h<br/>JSI Registration]
        DBHost[DBHostObject<br/>Database Connection]
        PreparedHost[PreparedStatementHostObject<br/>Prepared Queries]
        ThreadPool[OPThreadPool<br/>Background Execution]
        Bridge[bridge.cpp/h<br/>SQLite Abstraction]
    end
    
    subgraph "Platform Native"
        iOS[iOS OPSQLite.mm<br/>Objective-C++]
        Android[Android Module<br/>Kotlin + JNI]
    end
    
    subgraph "SQLite Backends"
        SQLite3[SQLite3<br/>Default]
        SQLCipher[SQLCipher<br/>Encryption]
        LibSQL[libSQL<br/>Remote Sync]
        Extensions[Extensions<br/>FTS5, RTree, etc.]
    end
    
    API --> Storage
    API --> NativeModule
    Storage --> API
    NativeModule --> JSI
    JSI --> Bindings
    Bindings --> DBHost
    Bindings --> PreparedHost
    DBHost --> ThreadPool
    DBHost --> Bridge
    PreparedHost --> Bridge
    Bridge --> SQLite3
    Bridge --> SQLCipher
    Bridge --> LibSQL
    Bridge --> Extensions
    iOS --> Bindings
    Android --> Bindings
    
    classDef jsLayer fill:#e1f5fe
    classDef nativeLayer fill:#f3e5f5
    classDef cppLayer fill:#e8f5e8
    classDef platformLayer fill:#fff3e0
    classDef backendLayer fill:#fce4ec
    
    class API,Storage,Types jsLayer
    class NativeModule,JSI nativeLayer
    class Bindings,DBHost,PreparedHost,ThreadPool,Bridge cppLayer
    class iOS,Android platformLayer
    class SQLite3,SQLCipher,LibSQL,Extensions backendLayer
```

### arch 2

```mermaid
graph LR
    subgraph "Public API Layer"
        OpenFuncs[open/openSync/openRemote]
        DBInterface[DB Interface]
        Storage[Storage Class]
        TransactionAPI[Transaction API]
    end
    
    subgraph "Core Database Operations"
        Execute[execute/executeSync]
        Batch[executeBatch]
        Prepared[prepareStatement]
        Reactive[reactiveExecute]
        HostObjects[executeWithHostObjects]
    end
    
    subgraph "Data Management"
        QueryResult[QueryResult]
        Hooks[Update/Commit/Rollback Hooks]
        Extensions[loadExtension]
        FileOps[loadFile/moveAssetsDatabase]
    end
    
    subgraph "Backend Features"
        Encryption[SQLCipher Encryption]
        RemoteSync[libSQL Remote Sync]
        LocalSync[libSQL Local Sync]
        Plugins[FTS5/RTree/Vec Plugins]
    end
    
    OpenFuncs --> DBInterface
    DBInterface --> Execute
    DBInterface --> Batch
    DBInterface --> Prepared
    DBInterface --> Reactive
    DBInterface --> HostObjects
    DBInterface --> TransactionAPI
    Execute --> QueryResult
    Batch --> QueryResult
    Prepared --> QueryResult
    DBInterface --> Hooks
    DBInterface --> Extensions
    DBInterface --> FileOps
    
    OpenFuncs -.-> Encryption
    OpenFuncs -.-> RemoteSync
    OpenFuncs -.-> LocalSync
    Extensions -.-> Plugins
    
    Storage --> DBInterface
    
    classDef apiLayer fill:#e3f2fd
    classDef opsLayer fill:#e8f5e8
    classDef dataLayer fill:#fff3e0
    classDef backendLayer fill:#fce4ec
    
    class OpenFuncs,DBInterface,Storage,TransactionAPI apiLayer
    class Execute,Batch,Prepared,Reactive,HostObjects opsLayer
    class QueryResult,Hooks,Extensions,FileOps dataLayer
    class Encryption,RemoteSync,LocalSync,Plugins backendLayer
```


## Threading arch

```mermaid
graph TB
    subgraph "JavaScript Thread (React Native Main)"
        JS[JavaScript Code]
        JSI[JSI Bridge]
    end
    
    subgraph "C++ Threading Layer"
        subgraph "JSI Host Objects"
            DBHost[DBHostObject]
            StmtHost[PreparedStatementHostObject]
        end
        
        subgraph "Thread Management"
            CallInvoker[React Native CallInvoker]
            ThreadPool[OPThreadPool<br/>Single Worker Thread]
        end
        
        subgraph "SQLite Layer"
            Bridge[bridge.cpp<br/>Pure SQLite Operations]
            SQLite[SQLite3/SQLCipher/libSQL]
        end
    end
    
    JS -->|"Call Database Methods"| JSI
    JSI -->|"Invoke HostObject Methods"| DBHost
    DBHost -->|"Queue Background Work"| ThreadPool
    ThreadPool -->|"Execute SQLite Operations"| Bridge
    Bridge -->|"Direct SQLite Calls"| SQLite
    
    ThreadPool -->|"invokeAsync(results)"| CallInvoker
    CallInvoker -->|"Return to JS Thread"| JSI
    JSI -->|"Promise Resolution"| JS
    
    DBHost -.->|"Manages"| StmtHost
    StmtHost -->|"Queue Statement Work"| ThreadPool
    
    classDef jsThread fill:#e1f5fe
    classDef cppThread fill:#e8f5e8
    classDef sqliteLayer fill:#fff3e0
    classDef threadMgmt fill:#f3e5f5
    
    class JS,JSI jsThread
    class DBHost,StmtHost,CallInvoker,ThreadPool threadMgmt
    class Bridge,SQLite sqliteLayer
```

### 📁 Folder Structure & Layered Architecture

```
op-sqlite/
├── src/                    # JavaScript/TypeScript API Layer
│   ├── index.ts           # Main public API exports
│   ├── Storage.ts         # AsyncStorage-compatible wrapper
│   └── NativeOPSQLite.ts  # TurboModule specification
├── cpp/                   # C++ Core Engine
│   ├── bindings.*         # JSI installation & global proxy
│   ├── DBHostObject.*     # Database connection management
│   ├── bridge.*           # SQLite operations abstraction
│   ├── OPThreadPool.*     # Background thread management
│   └── PreparedStatementHostObject.*  # Prepared queries
├── ios/                   # iOS Platform Layer
│   └── OPSQLite.mm        # Objective-C++ TurboModule
├── android/               # Android Platform Layer
│   ├── OPSQLiteModule.kt  # Kotlin TurboModule
│   └── cpp-adapter.cpp    # JNI bridge
├── c_sources/             # SQLite source variants
└── example/               # Demo application
```

### 🏗️ Architecture Layers

**Layer 1: JavaScript API** ([`src/index.ts`](file:///Users/jayshah/Documents/github/personal/clones/op-sqlite/src/index.ts))
- Public interfaces: `open()`, `openSync()`, `openRemote()`
- Database operations: `execute()`, `transaction()`, `executeBatch()`
- Type definitions: `DB`, `QueryResult`, `Transaction`
- Storage abstraction: AsyncStorage-compatible API

**Layer 2: React Native Bridge** ([`src/NativeOPSQLite.ts`](file:///Users/jayshah/Documents/github/personal/clones/op-sqlite/src/NativeOPSQLite.ts))
- TurboModule specification
- JSI installation via `__OPSQLiteProxy`
- Platform constants and utilities

**Layer 3: C++ Core Engine** (`cpp/`)
- JSI HostObjects for zero-copy data transfer
- Thread pool for non-blocking operations  
- Multiple SQLite backend support
- Prepared statement management

**Layer 4: Platform-Specific Native**
- iOS: Objective-C++ with framework support
- Android: Kotlin + JNI integration
- Platform-specific file paths and permissions

**Layer 5: SQLite Backends**
- Vanilla SQLite3 (default)
- SQLCipher (encryption)
- libSQL (remote sync with Turso)
- Extensions: FTS5, RTree, cr-sqlite, sqlite-vec

### 🔌 Public Interfaces & APIs

**Core Database Interface:**
```typescript
interface DB {
  // Query Operations
  execute(query: string, params?: Scalar[]): Promise<QueryResult>
  executeSync(query: string, params?: Scalar[]): QueryResult
  executeBatch(commands: SQLBatchTuple[]): Promise<BatchQueryResult>
  executeWithHostObjects(query: string, params?: Scalar[]): Promise<QueryResult>
  
  // Transaction Management
  transaction(fn: (tx: Transaction) => Promise<void>): Promise<void>
  
  // Prepared Statements
  prepareStatement(query: string): PreparedStatement
  
  // Database Management
  close(): void
  attach(params: {secondaryDbFileName: string, alias: string}): void
  loadExtension(path: string, entryPoint?: string): void
  
  // Reactive Queries
  reactiveExecute(params: ReactiveQueryParams): () => void
}
```

**Opening Databases:**
```typescript
// Local SQLite/SQLCipher
open({name: string, location?: string, encryptionKey?: string}): DB

// libSQL with sync capability
openSync({url: string, authToken: string, name: string}): DB

// Remote libSQL (Turso)
openRemote({url: string, authToken: string}): DB
```

**Storage API** ([`src/Storage.ts`](file:///Users/jayshah/Documents/github/personal/clones/op-sqlite/src/Storage.ts)):
```typescript
class Storage {
  getItem(key: string): Promise<string | undefined>
  setItem(key: string, value: string): Promise<void>
  removeItem(key: string): Promise<void>
  clear(): Promise<void>
  // + sync variants
}
```

### ⚠️ Edge Cases & Limitations

**Performance Considerations:**
- Default `execute()` duplicates data (rawRows → objects), use `executeWithHostObjects()` for large results
- `executeBatch()` and `loadFile()` bypass per-call JSI overhead
- Prepared statements only beneficial for repeated identical queries
- mmap sizing critical for large databases (default in Storage: 256MB)

**Thread Safety Issues:**
- Multiple queries on same DB run concurrently but SQLite serializes internally
- Transaction queue prevents write-write races within `transaction()` calls
- Manual `execute()` calls outside transactions can still race
- HostObject lifetime not protected - accessing closed DB causes crashes

**Cross-Platform Gotchas:**
- Extension loading disabled on libSQL and iOS embedded builds
- iOS requires `getDylibPath()` for extension loading
- Android asset database moves can fail silently without storage permissions
- Path handling differs (iOS: NSLibraryDirectory, Android: Context.getDatabasePath)

**Memory & Resource Limits:**
- Large result sets create memory spikes with default marshalling
- Reactive query rowids > 2^53 lose precision in JavaScript
- ArrayBuffer parameter sanitization limited to 2 nesting levels
- No automatic cleanup of abandoned HostObjects

**Build Configuration Risks:**
- Runtime feature detection (`isSQLCipher()`, `isLibsql()`) must match build flags
- SQLite threading mode assumptions (expects THREADSAFE=2)
- Extension compatibility varies by build variant

**Recommended Mitigations:**
- Use `executeRaw()` or HostObjects for large data sets
- Implement proper error handling for installation failures
- Add cleanup logic for long-lived database connections
- Validate build configuration matches runtime expectations
- Monitor memory usage with large result sets or reactive queries

The architecture provides excellent performance through JSI and thread pooling, but requires careful consideration of these edge cases for production deployments.