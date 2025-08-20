## SQLite Introspection: How It Works in Detail

https://mermaid.live/edit#base64:eyJjb2RlIjoiZ3JhcGggVERcbiAgICBBW1NRTGl0ZSBEYXRhYmFzZSBGaWxlXSAtLT4gQltiZXR0ZXItc3FsaXRlMyBEcml2ZXJdXG4gICAgQiAtLT4gQ1tLeXNlbHkgU1FMaXRlIERpYWxlY3RdXG4gICAgQyAtLT4gRFtLeXNlbHkgQnVpbHQtaW4gSW50cm9zcGVjdGlvbl1cbiAgICBEIC0tPiBFW1BSQUdNQSBRdWVyaWVzXVxuICAgIEUgLS0+IEZbVGFibGUgJiBDb2x1bW4gTWV0YWRhdGFdXG4gICAgRiAtLT4gR1tTUUxpdGVJbnRyb3NwZWN0b3JdXG4gICAgRyAtLT4gSFtEYXRhYmFzZU1ldGFkYXRhIE9iamVjdF1cbiAgICBcbiAgICBzdWJncmFwaCBcIlNRTGl0ZSBDb25uZWN0aW9uIFN0cmluZ3NcIlxuICAgICAgICBBMVtcIkZpbGUgUGF0aDogJy9wYXRoL3RvL2RiLnNxbGl0ZSdcIl1cbiAgICAgICAgQTJbXCJXaW5kb3dzOiAnQzovZGF0YS9hcHAuZGInXCJdXG4gICAgICAgIEEzW1wiSW4tTWVtb3J5OiAnOm1lbW9yeTonXCJdXG4gICAgZW5kXG4gICAgXG4gICAgc3ViZ3JhcGggXCJQUkFHTUEgUXVlcmllcyAoSW50ZXJuYWwpXCJcbiAgICAgICAgRTFbXCJQUkFHTUEgdGFibGVfbGlzdFwiXVxuICAgICAgICBFMltcIlBSQUdNQSB0YWJsZV9pbmZvKHRhYmxlX25hbWUpXCJdXG4gICAgICAgIEUzW1wiUFJBR01BIGZvcmVpZ25fa2V5X2xpc3QodGFibGUpXCJdXG4gICAgZW5kXG4gICAgXG4gICAgQTEgLS0+IEFcbiAgICBBMiAtLT4gQVxuICAgIEEzIC0tPiBBXG4gICAgRSAtLT4gRTFcbiAgICBFIC0tPiBFMlxuICAgIEUgLS0+IEUzIn0=

SQLite introspection in kysely-codegen is refreshingly simple compared to other databases. Here's exactly how it works:

### Starting Point: Database Connection

Yes, you need a SQLite database file to start (or an in-memory database). The tool accepts several connection string formats:

    // File paths (most common)
    'C:/Program Files/sqlite3/db'        // Windows
    '/usr/local/bin/my-app.db'          // Unix/Linux
    './database.sqlite'                 // Relative path

    // Special cases
    ':memory:'                          // In-memory database
    'file:data.db?mode=ro'             // URI format with options

### The Introspection Process

#### 1. Database Connection Setup

The SqliteIntrospectorDialect creates the connection:

    // In sqlite-dialect.ts
    async createKyselyDialect(options: CreateKyselyDialectOptions) {
      const { default: Database } = await import('better-sqlite3');

      return new KyselySqliteDialect({
        database: new Database(options.connectionString), // Direct file path!
      });
    }

#### 2. Simple Introspection Logic

The SqliteIntrospector is remarkably minimal:

    export class SqliteIntrospector extends Introspector<any> {
      async introspect(options: IntrospectOptions<any>) {
        const tables = await this.getTables(options);  // Uses Kysely's built-in introspection
        const enums = new EnumCollection();            // SQLite has no enums
        return new DatabaseMetadata({ enums, tables });
      }
    }

#### 3. Under the Hood: PRAGMA Queries

While not visible in the kysely-codegen source, Kysely's db.introspection.getTables() uses SQLite's PRAGMA commands internally:

    -- Get list of all tables
    PRAGMA table_list;

    -- Get detailed info for each table
    PRAGMA table_info(table_name);

    -- Get foreign key information
    PRAGMA foreign_key_list(table_name);

    -- Get index information
    PRAGMA index_list(table_name);

#### 4. What SQLite Introspection Discovers

For a table like this:

    CREATE TABLE foo_bar (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_status TEXT,
      "false" INTEGER NOT NULL,
      "true" INTEGER NOT NULL
    );

The introspection returns structured metadata:

    {
      name: 'foo_bar',
      columns: [
        {
          name: 'id',
          dataType: 'INTEGER',
          isNullable: false,
          hasDefaultValue: true,       // AUTOINCREMENT implies default
          isAutoIncrementing: true
        },
        {
          name: 'user_status',
          dataType: 'TEXT',
          isNullable: true,            // No NOT NULL constraint
          hasDefaultValue: false
        },
        // ... more columns
      ]
    }

### SQLite-Specific Simplifications

Why SQLite introspection is simpler:

   1. No Schemas: SQLite doesn't have multiple schemas like PostgreSQL
   2. No Enums: SQLite doesn't support native enum types
   3. No Domains: SQLite doesn't have PostgreSQL-style custom domains
   4. Simple Types: Limited built-in data types (INTEGER, TEXT, REAL, BLOB, NUMERIC)

No Custom SQL Queries Needed: Unlike PostgreSQL which requires complex recursive CTE queries for domains and enums, SQLite introspection just delegates to Kysely's built-in PRAGMA-based introspection.

### Example: Complete Flow

    # 1. You have a SQLite file
    ./my-app.db

    # 2. Run kysely-codegen
    DATABASE_URL=./my-app.db kysely-codegen --dialect=sqlite

    # 3. Internal process:
    #    - better-sqlite3 opens ./my-app.db
    #    - Kysely runs PRAGMA table_list
    #    - Kysely runs PRAGMA table_info() for each table
    #    - SqliteIntrospector wraps results in DatabaseMetadata
    #    - Generator transforms to TypeScript interfaces

The beauty of SQLite introspection is its simplicity - no complex queries, no special cases, just straightforward PRAGMA commands to read the database structure.