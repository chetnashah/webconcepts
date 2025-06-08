
## parse_json for string -> dynamic
In Kusto Query Language (KQL), parse_json() and todynamic() are essentially synonymous and perform the same action: they convert a string to a dynamic data type, which can then be accessed using dot notation or subscripting.

`parse_json(json)` - returns An object of type dynamic that is determined by the value of json:

If json is of type dynamic, its value is used as-is.
If json is of type string, and is a properly formatted JSON string, then the string is parsed, and the value produced is returned.
If json is of type string, but it isn't a properly formatted JSON string, then the returned value is an object of type dynamic that holds the original string value.

The nested types also become `dynamic`.


## mv-expand 

Expands multi-value dynamic arrays or property bags into multiple records.

**Having a JSON array is nice, but what if we really want a dataset of individual rows, where each item from the JSON array appears in a row? As you may have guessed by now, the mv-expand operator can do this for us.**

mv-expand can be described as the opposite of the aggregation operators that pack multiple values into a single dynamic-typed array or property bag, such as summarize ... make-list() and make-series.