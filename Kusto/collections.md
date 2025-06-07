
---

## KQL Reference Notes: Collection Data Types

Kusto Query Language (KQL) provides robust mechanisms for handling collections of data, primarily through the `dynamic` data type, but also via a special tuple-like syntax for specific operators.

### 1. The `dynamic` Data Type: The Universal Container

The `dynamic` scalar data type is the cornerstone for collections in KQL. It can hold:
*   A single scalar value (string, long, bool, datetime, guid, timespan, decimal, real).
*   An **array** (ordered list) of dynamic values.
*   A **property bag** (dictionary/object) mapping string keys to dynamic values.

**Example:**
```kql
print d_null = dynamic(null),
      d_num = dynamic(123),
      d_string = dynamic("hello"),
      d_array_simple = dynamic([1, 2, 3]),
      d_array_mixed = dynamic([1, "world", true, dynamic({"nested": "value"})]),
      d_bag = dynamic({"name": "Kusto", "type": "Language", "features": dynamic(["powerful", "scalable"])})
```

---

### 2. Literal Collection Definitions i.e. `(a, b, c)`

#### a. Tuple-like Literal Lists (for `in` operator family)

*   **Overview:** A concise way to define a static, fixed list of scalar constants. It's not a `dynamic` type itself but a syntactic sugar for operators that accept multiple scalar arguments.
*   **Syntax:** `(scalar_value1, scalar_value2, ..., scalar_valueN)`
*   **Primary Use:** With `in`, `!in` (case-sensitive) and `in~`, `!in~` (case-insensitive) operators for comparison.
*   **Characteristics:**
    *   Values must be scalar literals (string, number, bool, datetime, etc.).
    *   Cannot be assigned to a `let` variable as this specific structure.
    *   Not directly manipulable with array functions.
*   **When to Use:** For simple, static lists of scalars used directly in comparison operators like `in`.
*   **Examples:**
    ```kql
    SecurityEvent | where EventID in (4624, 4625, 4634)
    ConfigurationData | where ServiceName in~ ("WebSvc", "AppSvc", "DBSvc")
    MyTable | where Status !in ("Completed", "Cancelled")
    ```

#### b. Dynamic Literal Arrays (Lists)

*   **Overview:** Explicitly creates a collection of ordered items of type `dynamic`.
*   **Syntax:**
    1.  `dynamic([item1, item2, ...])`
    2.  `pack_array(item1, item2, ...)`
*   **Characteristics:**
    *   Creates an actual `dynamic` data type holding an array.
    *   Can be assigned to `let` variables or be a column value.
    *   Items can be of mixed types, including other dynamic arrays or bags.
    *   Can be manipulated with `array_*` functions.
*   **When to Use:**
    *   When you need to store the list in a variable.
    *   When the list is complex (mixed types, nested).
    *   When you need to apply array functions.
    *   When passed to or returned from functions expecting a dynamic array.
*   **Examples:**
    ```kql
    let allowed_ips = dynamic(["10.0.0.1", "192.168.1.100", "172.16.0.5"]);
    NetworkConnections | where SourceIP in (allowed_ips)

    let critical_ports = pack_array(22, 80, 443, 3389);
    FirewallLogs | where DestinationPort in (critical_ports)

    print mixed_array = dynamic([1, "two", true, pack_array("a", "b")])
    ```

#### c. Dynamic Literal Property Bags (Dictionaries/Objects)

*   **Overview:** Explicitly creates a collection of key-value pairs of type `dynamic`. Keys are strings, values are dynamic.
*   **Syntax:**
    1.  `dynamic({"key1": value1, "key2": value2, ...})`
    2.  `pack("key1", value1, "key2", value2, ...)` (also `bag_pack()`)
*   **Characteristics:**
    *   Creates an actual `dynamic` data type holding a property bag.
    *   Can be assigned to `let` variables or be a column value.
    *   Values can be of mixed types, including other dynamic arrays or bags.
    *   Can be manipulated with `bag_*` functions and accessed via keys.
*   **When to Use:** For representing structured objects, configuration data, or when needing named fields within a dynamic value.
*   **Examples:**
    ```kql
    let user_profile = dynamic({
        "username": "kql_user",
        "id": 12345,
        "roles": dynamic(["admin", "editor"]),
        "preferences": dynamic({"theme": "dark", "notifications": true})
    });
    print user_profile.username, user_profile.roles[0], user_profile.preferences.theme

    let event_details = pack("Timestamp", now(), "Severity", "High", "Source", "App01");
    print event_details
    ```

---

### 3. Creating Collections via Aggregation (`summarize` operator)

The `summarize` operator is powerful for creating collections from groups of rows.

*   **`make_list(Expr [, MaxSize])` / `make_list_if(Expr, Predicate [, MaxSize])`:**
    *   Creates a `dynamic` array of all `Expr` values (where `Predicate` is true for `_if` version) in the group. Duplicates included.
    ```kql
    Logs | summarize IPs = make_list(SourceIP), CriticalEvents = make_list_if(EventID, Severity > 3) by UserName
    ```

*   **`make_set(Expr [, MaxSize])` / `make_set_if(Expr, Predicate [, MaxSize])`:**
    *   Creates a `dynamic` array of unique `Expr` values in the group.
    ```kql
    UserSessions | summarize UniquePagesVisited = make_set(PagePath) by SessionId
    ```

*   **`make_bag(Expr [, MaxSize])` / `make_bag_if(Expr, Predicate [, MaxSize])`:**
    *   Creates a `dynamic` property bag from `Expr` values (which are typically packed key-value pairs) in the group. Duplicate keys: last one wins.
    ```kql
    DeviceProperties
    | summarize Properties = make_bag(pack(PropertyName, PropertyValue)) by DeviceID
    ```

*   **`make_series(...)`:**
    *   Creates a series of aggregated values along a specified axis (usually time). Produces columns that are dynamic arrays.
    ```kql
    TimeSeriesData
    | make-series count() on Timestamp from startofday(ago(7d)) to now() step 1h by Source
    // Output columns 'Source', 'Timestamp' (array), 'count_' (array)
    ```

---

### 4. Key Operators for Collections

*   **`mv-expand ColumnName`**: Expands a multi-value (array or property bag) column into multiple rows, one row per element/value. For property bags, it can expand keys, values, or both.
    ```kql
    datatable(User:string, Roles:dynamic) [
        "Alice", dynamic(["Reader", "Contributor"]),
        "Bob", dynamic(["Admin"])
    ]
    | mv-expand Roles
    // Yields 3 rows, with Roles being "Reader", "Contributor", "Admin" respectively.
    ```
*   **`mv-apply`**: More advanced; applies a subquery to each element of a dynamic array/bag.

---

### 5. Accessing Collection Elements

*   **Arrays:** `MyDynamicArray[index]` (0-based). Negative indices count from the end (`-1` is last).
    ```kql
    let arr = dynamic([10, 20, 30]);
    print First = arr[0], Last = arr[-1] // 10, 30
    ```
*   **Property Bags:**
    *   Dot notation: `MyDynamicBag.PropertyName`
    *   Bracket notation: `MyDynamicBag['Property-Name-With-Special-Chars']` or `MyDynamicBag[dynamic_variable_holding_key_name]`
    ```kql
    let bag = dynamic({"name": "Test", "item-count": 5});
    print bag.name, bag['item-count'] // Test, 5
    ```

---

### 6. Common Collection Functions (Partial List)

*   **General:**
    *   `gettype(value)`: Returns string representation of the value's type (e.g., "dynamic", "string").
    *   `isnull(value)`, `isnotnull(value)`, `isempty(value)`, `isnotempty(value)`
*   **Array Functions (`array_`)**:
    *   `array_length(array)`
    *   `array_concat(arr1, arr2, ...)`
    *   `array_slice(array, start, end)`
    *   `array_sort_asc(array)` / `array_sort_desc(array)`
    *   `array_index_of(array, value)`: Returns 0-based index or -1.
    *   `array_sum(array)` (for numeric arrays)
    *   `set_intersect(arr1, arr2, ...)`: Returns array of common values.
    *   `set_difference(arr1, arr2)`: Returns array of values in arr1 not in arr2.
    *   `set_union(arr1, arr2, ...)`: Returns array of all unique values.
    *   `zip(arr1, arr2, ...)`: Creates an array of arrays.
*   **Property Bag Functions (`bag_`)**:
    *   `bag_keys(bag)`: Returns an array of keys.
    *   _`bag_values(bag)`: (Note: No direct `bag_values` often use `mv-expand` or custom logic)._
    *   `bag_merge(bag1, bag2, ...)`
    *   `bag_remove_keys(bag, keys_array)`

---

### 7. Searching In/Matching Collections

*   **`in` operator (with Tuple-like or Dynamic lists):**
    ```kql
    MyTable | where Column in (value1, value2)                      // Tuple-like (case-sensitive)
    MyTable | where Column in~ (value1, value2)                     // Tuple-like (case-INsensitive)
    let items = dynamic(["a", "B"]);
    MyTable | where Column in (items)                             // Dynamic array (case-sensitive)
    MyTable | where Column in~ (items)                            // Dynamic array (case-INsensitive)
    ```
*   **`array_contains(array, value)`:** Checks if `value` (exact, case-sensitive for strings) exists in `array`.
    ```kql
    datatable(Tags:dynamic) [dynamic(["urgent", "review"])]
    | where array_contains(Tags, "urgent") // true
    | where array_contains(Tags, "Urgent") // false
    ```
*   **`has_any_index(source_array, values_array)`:** Checks if any value from `values_array` exists in `source_array`. Returns 0-based index of first match or -1.
    ```kql
    let data = dynamic(["a", "b", "c"]);
    print has_any_index(data, dynamic(["x", "c", "y"])) //  2
    ```
*   **Pattern for "has any of":** (using `set_intersect`)
    ```kql
    let my_array = dynamic(["A", "B", "C"]);
    let search_for = dynamic(["X", "B", "Z"]);
    print HasAny = array_length(set_intersect(my_array, search_for)) > 0 // true
    ```
*   **Checking Key Existence in Property Bags:**
    ```kql
    let bag = dynamic({"name": "Kusto", "type": "Language"});
    print HasNameKey = isnotnull(bag.name) // true
    print HasVersionKey = isnotnull(bag.version) // false
    print "type" in (bag_keys(bag)) // true
    ```
*   **String operators on collection elements (after `mv-expand` or direct access):**
    ```kql
    Logs
    | mv-expand Attribute = Attributes // if Attributes is an array of strings
    | where Attribute contains "error"
    ```

---

### 8. Quick Comparison: Tuple-like Lists vs. Dynamic Arrays

| Feature          | `(val1, val2, ...)` (Tuple-like)          | `dynamic([val1, val2, ...])` (Dynamic Array) |
| :--------------- | :---------------------------------------- | :------------------------------------------- |
| **Type**         | Syntax for operators, not a KQL type    | `dynamic`                                    |
| **Variability**  | Static, defined at query authoring        | Can be static or dynamically generated      |
| **Assignment**   | Not directly assignable to `let`          | Assignable to `let` or table columns         |
| **Manipulable**  | No                                        | Yes (with `array_*` functions)              |
| **Primary Use**  | `in`, `!in`, `in~`, `!in~` operators      | Column values, variables, function args/returns |

---

## in vs has vs contains

Okay, let's break down the `in`, `has`, and `contains` operators in KQL, focusing on how they apply to searching within strings and collections.

**Core Distinction at a Glance:**

*   **`in`**: Checks for an **exact match** of a value against a **list/set of specified values**. Think "is this item present in this predefined collection?"
*   **`has`**: Optimized for searching **whole terms (words)** within a **string**. Think "does this string field contain this specific word/token?" It's case-insensitive by default and leverages indexing for speed.
*   **`contains`**: Checks if a **string** contains another **substring** (can be partial). Think "is this sequence of characters found anywhere inside this string field?" It's case-sensitive by default.

---

### Detailed Comparison Table

| Feature             | `in` / `in~`                                      | `has` / `has_cs`                                      | `contains` / `contains_cs` / `contains_cis`             |
| :------------------ | :------------------------------------------------ | :---------------------------------------------------- | :------------------------------------------------------ |
| **Primary Target**  | A scalar value compared against a list of scalars | A string                                              | A string                                                |
| **Matching Logic**  | Exact value match against elements in a list      | Whole term/token match (word boundaries matter)       | Substring match (any part of the string)                |
| **Case Sensitivity**| `in`: Case-Sensitive<br>`in~`: Case-Insensitive   | `has`: Case-Insensitive (default)<br>`has_cs`: Case-Sensitive | `contains`: Case-Sensitive (default)<br>`contains_cs`: Explicitly Case-Sensitive<br>`contains_cis`: Case-Insensitive |
| **Performance**     | Efficient for its purpose.                        | **Generally faster** for indexed terms than `contains`. [cloudsma.com](https://www.cloudsma.com/2020/07/log-analytics-operators-has-contains-and-in/), [linkedin.com](https://www.linkedin.com/pulse/kql-string-operators-contains-has-hasall-hasany-ben-jiles) | Slower than `has` if `has` can use an index, as it scans. |
| **Wildcards**       | Not applicable (exact matches)                    | Not applicable (searches for the term as is)          | Not applicable (searches for the substring as is)       |
| **Use with Collections (Arrays/Lists)** | **Directly applies.** Checks if a column's value is an element of the provided collection (literal or dynamic). | Used on individual string elements *within* a collection (usually after `mv-expand`) or with `has_any` against a list of terms. | Used on individual string elements *within* a collection (usually after `mv-expand`). |
| **Indexed Terms**   | N/A                                               | **Optimized for indexed terms.** If a term is indexed, `has` can be very fast. | Does not primarily rely on term indexing in the same way; performs a scan. |
| **Substring Nuance**| N/A                                               | Will NOT find "ell" in "hello" or "cell" if "ell" is not a standalone token. It needs more of the string to match a term. [stackoverflow.com](https://stackoverflow.com/questions/74827840/whas-is-the-difference-between-the-has-and-contains-operators-in-kql) | Will find "ell" in "hello" because it's looking for the sequence of characters. |

---

### 1. `in` and `in~` Operators (for Collections and Lists)

*   **Purpose:** Used to filter records where a column's value matches **any one of a specified set of values**.
*   **Syntax:**
    *   `ColumnName in (value1, value2, ...valueN)`
    *   `ColumnName in (dynamic_array_variable)`
    *   `ColumnName in~ (...)` for case-insensitive matching.
*   **How it works with collections:**
    *   The list `(value1, value2, ...)` IS the collection you are checking against.
    *   If `ColumnName` itself contains a collection (e.g., dynamic array), `in` does NOT check for intersection. `in` expects `ColumnName` to be a scalar that might match one of the scalars in your provided list.
    *   To check if any element of a *column that is an array* is in another list, you'd typically use `mv-expand` first, or functions like `set_intersect`.

*   **Examples:**
    ```kql
    // Events where EventID is 4624 OR 4625
    SecurityEvent
    | where EventID in (4624, 4625)

    // Users whose names are 'Alice' or 'Bob' (case-insensitive)
    Users
    | where UserName in~ ("alice", "bob")

    let vip_ips = dynamic(["10.0.0.1", "10.0.0.5"]);
    NetworkLogs
    | where SourceIP in (vip_ips)

    // If 'Tags' is an array column, and you want to see if any tag is 'critical' or 'error'
    // Incorrect direct use with 'in' for array elements:
    // MyTable | where Tags in ("critical", "error") // This won't work as intended if Tags is an array
    // Correct way (one of them):
    MyTable
    | mv-expand Tag = Tags to typeof(string)
    | where Tag in ("critical", "error")
    | distinct OriginalRecordId_or_other_identifier // If you need to count original records
    ```

---

### 2. `has` Operator (for Strings - Whole Term Matching)

*   **Purpose:** Searches for the presence of a **whole term** (a word or token) within a string. It's optimized for searching indexed fields and is generally case-insensitive.
*   **Syntax:**
    *   `StringColumn has "term"` (case-insensitive)
    *   `StringColumn has_cs "Term"` (case-sensitive)
*   **How it works with collections (dynamic arrays of strings):**
    *   If you have a column that is a dynamic array of strings, `has` cannot be directly applied to the array to see if any string element `has` the term.
    *   You would typically `mv-expand` the array first, then apply `has` to the resulting scalar string column.
    *   Or, use `has_any (dynamic_array_of_terms)` if `StringColumn` is a scalar string and you want to check if it `has` any term from your dynamic array.

*   **Key Concept: Term vs. Substring:**
    *   A "term" is typically a sequence of alphanumeric characters separated by non-alphanumeric characters (spaces, punctuation, start/end of string).
    *   `"Event: User login success" has "login"` -> TRUE
    *   `"Event: User loggedin success" has "login"` -> FALSE (unless "loggedin" is itself considered a single token and you search for "loggedin". "login" is not a standalone term here.)
    *   `"Event: User login success" contains "login"` -> TRUE
    *   `"Event: User loggedin success" contains "login"` -> TRUE

*   **Examples:**
    ```kql
    AppLogs
    | where Message has "error" // Finds "error", "Error", "ERROR"

    AppLogs
    | where Message has_cs "Error" // Only finds "Error"

    // If 'Keywords' is an array of strings, and 'Description' is a string field
    Products
    | mv-expand Keyword = Keywords to typeof(string)
    | where Description has Keyword // Search if any keyword exists as a whole term in Description

    // Check if 'Message' string has any of the terms from 'search_terms' array
    let search_terms = dynamic(["failed", "denied", "exception"]);
    AppLogs
    | where Message has_any (search_terms)
    ```
    As noted by CloudsMA, `has` is more efficient when you know what you're looking for and it's a term, but less useful if you need partial matches [cloudsma.com](https://www.cloudsma.com/2020/07/log-analytics-operators-has-contains-and-in/).

---

### 3. `contains` Operator (for Strings - Substring Matching)

*   **Purpose:** Checks if a string field contains a specified substring. It's case-sensitive by default.
*   **Syntax:**
    *   `StringColumn contains "substring"` (case-sensitive)
    *   `StringColumn contains_cs "substring"` (explicitly case-sensitive)
    *   `StringColumn contains_cis "substring"` (case-insensitive)
*   **How it works with collections (dynamic arrays of strings):**
    *   Similar to `has`, if you have a column that is a dynamic array of strings, `contains` cannot be directly applied to the array to check all its elements.
    *   You would `mv-expand` the array first, then apply `contains` to the resulting scalar string column.
    *   There isn't a direct `contains_any` equivalent to `has_any` operating in the same way for a list of substrings. You'd typically use `mv-expand` or multiple `or` conditions.

*   **Examples:**
    ```kql
    AppLogs
    | where Message contains "err" // Finds "err", "error", "kernel_error", etc. (Case-sensitive)

    AppLogs
    | where Message contains_cs "Err" // Only if "Err" (exact case) is a substring.

    AppLogs
    | where Message contains_cis "err" // Finds "err", "Err", "ERRor", etc.

    // If 'FilePaths' is an array of strings
    Events
    | mv-expand FilePath = FilePaths to typeof(string)
    | where FilePath contains "windows\\system32"
    ```
    `contains_cs` being the case-sensitive version is highlighted by ArcaneCode [arcanecode.com](https://arcanecode.com/2023/01/09/fun-with-kql-contains-and-in/). Stack Overflow notes `contains` will find substrings even if they are not full terms [stackoverflow.com](https://stackoverflow.com/questions/74827840/whas-is-the-difference-between-the-has-and-contains-operators-in-kql).

---

**Choosing the Right Operator:**

1.  **Checking membership in a predefined list?**
    *   Use `in` (case-sensitive) or `in~` (case-insensitive).

2.  **Searching for a whole word/token in a string field (performance matters)?**
    *   Use `has` (case-insensitive by default) or `has_cs` (case-sensitive).

3.  **Searching for an arbitrary sequence of characters (substring) within a string field?**
    *   Use `contains` (case-sensitive by default), `contains_cs`, or `contains_cis`.

4.  **Working with a column that IS a collection (e.g., an array of strings)?**
    *   **To check if any element of the array matches one of several specific values:** `mv-expand` the array, then use `in` on the expanded column.
    *   **To check if any string element in the array `has` a specific term:** `mv-expand` the array, then use `has` on the expanded string column.
    *   **To check if any string element in the array `contains` a specific substring:** `mv-expand` the array, then use `contains` on the expanded string column.
    *   **To check if a scalar string column `has` any term from a list of terms:** Use `has_any (dynamic_array_of_terms)`.

Remember that `has` is generally faster than `contains` when applicable due to its use of indexing, but it has stricter matching rules (whole terms). `contains` is more flexible for partial matches but might be slower.