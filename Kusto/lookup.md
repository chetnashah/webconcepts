Extends the columns of a fact table with values looked-up in a dimension table.

## lookup on a "dynamic type" is not supported
e.g. following is not supported:
```kql

Shelves
| mv-expand kind=array rf_id=rf_ids
 | lookup kind=leftouter Books on $left.rf_id == $right.rf_id // not allowed
| take 500
```
### Fix: cast dynamic to type that supports lookup (e.g. string /guid or others)
```kql
Shelves
| mv-expand kind=array rf_id=rf_ids
| extend strrfid = tostring(rf_id)
 | lookup kind=leftouter Books on $left.strrfid == $right.rf_id
| take 500
```