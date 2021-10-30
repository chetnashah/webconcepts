

### JSON support via VARIANT type

#### parse_json

Snowflake parses json keys as sub columns.

use `:` to indicate attribute keys.
e.g.
```sql
select v:fullName from json_demo;
```
Nested attributes are captured via period e.g. `.`
```sql
select v:area.areaCode::string as area_code,
v:area.susbcriberNumber::string as subscriber_number
from json_demo;
```

### flatten

`flatten` takes an array and returns a row for each
element in the array.

e.g. json:
```json
{
    "children": [
        {"name": "Jayden", "age": 10, "gender": "Male"},
        {"name":"Emma", "age": 8, "gender":"Female"},
        {"name":"Madelyn", "age":6, "gender": "Female"}
    ]
}
```

```sql
select 
f.value:name::string as child_name,
f.value:gender::string as child_gender,
f.value:age::string as child_age
from json_demo, table(flatten(v:children)) f;
```

#### nested arrays

```json
{
    "citiesLived": [
        {
            "cityName":"London",
            "yearsLived": [1,2,3]
        },
        {
            "cityName":"Paris",
            "yearsLived":[3,5,6]
        }
    ]
}
```

Just do multiple `flatten`.
```sql
select
cl.value:cityName::string as city_name,
yl.value::string as year_lived
from json_demo,
    table(flatten(v:citiesLived)) cl,
    table(flatten(cl.value:yearsLived)) yl
```


### casting

Use `::` to do casting

```sql
select v:fullName::string,
v:age::int as age,
v:gender::string as gender
from json_demo;
```

### comma separated string can be split into rows

Use split, flatten & lateral join

