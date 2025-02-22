SQLite extensions are additional modules that add functionality to SQLite. They're typically compiled as dynamic libraries (.dll, .so, or .dylib files) that can be loaded at runtime.

Here's a practical example using the `sqlite-vss` extension for vector similarity search:

```python
import sqlite3

# 1. Load extension (assuming sqlite-vss is installed)
conn = sqlite3.connect(':memory:')
conn.enable_load_extension(True)
conn.load_extension("sqlite-vss")  # Load the vector search extension

# 2. Create a vector similarity search table
conn.execute("""
    CREATE VIRTUAL TABLE items_vss USING vss0(
        id INTEGER PRIMARY KEY,
        description TEXT,
        embedding BLOB,  -- Vector data stored as blob
        dims=384        -- Vector dimensions
    );
""")

# 3. Use the extension's functionality
def insert_vector(description, vector):
    conn.execute("""
        INSERT INTO items_vss (description, embedding)
        VALUES (?, vss_encode(?))
    """, (description, vector))

def search_similar(query_vector, limit=5):
    return conn.execute("""
        SELECT 
            description,
            vss_distance(embedding, vss_encode(?)) as distance
        FROM items_vss
        ORDER BY distance ASC
        LIMIT ?
    """, (query_vector, limit))
```

Common useful extensions:

1. JSON1 Extension (Built-in in most SQLite builds):
```python
conn = sqlite3.connect(':memory:')

# Create table with JSON data
conn.execute("""
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    data JSON
);
""")

# Insert JSON data
conn.execute("""
INSERT INTO users (data) VALUES
    ('{"name": "John", "age": 30, "tags": ["developer", "python"]}');
""")

# Query using JSON functions
result = conn.execute("""
SELECT 
    json_extract(data, '$.name') as name,
    json_extract(data, '$.tags[0]') as first_tag
FROM users;
""").fetchall()
```

2. FTS5 Extension (Full-Text Search):
```python
conn = sqlite3.connect(':memory:')

# Create FTS virtual table
conn.execute("""
CREATE VIRTUAL TABLE docs USING fts5(
    title,
    body,
    tokenize='porter'  -- Use Porter stemming
);
""")

# Insert documents
conn.execute("""
INSERT INTO docs VALUES
    ('SQLite Tutorial', 'Learn about SQLite database'),
    ('Python Guide', 'Programming with Python');
""")

# Full-text search
results = conn.execute("""
SELECT * FROM docs 
WHERE docs MATCH 'learn OR programming'
ORDER BY rank;
""").fetchall()
```

3. Math Extension:
```python
conn = sqlite3.connect(':memory:')
conn.enable_load_extension(True)
conn.load_extension("sqlite3-math")

# Use math functions
result = conn.execute("""
SELECT 
    math_sin(45),
    math_sqrt(16),
    math_pow(2, 3)
""").fetchone()
```

4. UUID Extension:
```python
conn = sqlite3.connect(':memory:')
conn.enable_load_extension(True)
conn.load_extension("sqlite-uuid")

# Create table with UUID
conn.execute("""
CREATE TABLE sessions (
    id TEXT PRIMARY KEY,
    user_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
""")

# Insert with UUID
conn.execute("""
INSERT INTO sessions (id, user_id)
VALUES (uuid(), 1);
""")
```

5. Spatial/RTree Extension (Built-in):
```python
conn = sqlite3.connect(':memory:')

# Create spatial index
conn.execute("""
CREATE VIRTUAL TABLE locations USING rtree(
    id,
    min_lat, max_lat,  -- latitude bounds
    min_lon, max_lon   -- longitude bounds
);
""")

# Insert location data
conn.execute("""
INSERT INTO locations VALUES
    (1, 40.7128, 40.7128, -74.0060, -74.0060);  -- New York
""")

# Spatial query
nearby = conn.execute("""
SELECT id FROM locations
WHERE min_lat >= 40.0 
    AND max_lat <= 41.0
    AND min_lon >= -75.0
    AND max_lon <= -73.0;
""").fetchall()
```

To use extensions:

1. First, check if the extension is built-in or needs installation:
```bash
# Install external extension (example)
pip install sqlite-vss
# or
brew install sqlite-extensions
```

2. Enable extension loading in your code:
```python
conn = sqlite3.connect('database.db')
conn.enable_load_extension(True)
conn.load_extension("extension_name")
```

3. Check loaded extensions:
```sql
SELECT * FROM pragma_module_list;
```

Security note: Loading extensions requires careful consideration in production environments, as it can pose security risks. Always verify extensions come from trusted sources.

Would you like me to explain any specific extension or concept in more detail?