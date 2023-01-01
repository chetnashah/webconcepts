

## Property list

A property list is a combination of any of the following things:
* NSArray
* NSDictionary
* NSString
* NSData
* NSDate
* NSNumber (integer, float, or Boolean)

## Writing from code/memory data to plist

```objc
NSMutableArray *stocks = [[NSMutableArray alloc] init];
NSMutableDictionary *stock;
stock = [NSMutableDictionary dictionary];
[stock setObject:@"AAPL"
forKey:@"symbol"];
[stock setObject:[NSNumber numberWithInt:200]
forKey:@"shares"];
[stocks addObject:stock];
stock = [NSMutableDictionary dictionary];
[stock setObject:@"GOOG"
forKey:@"symbol"];
[stock setObject:[NSNumber numberWithInt:160]
forKey:@"shares"];
[stocks addObject:stock];
[stocks writeToFile:@"/tmp/stocks.plist"
atomically:YES];
```

## Resulting serialized file

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC
"-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<array>
    <dict>
        <key>shares</key>
        <integer>200</integer>
        <key>symbol</key>
        <string>AAPL</string>
    </dict>
    <dict>
        <key>shares</key>
        <integer>160</integer>
        <key>symbol</key>
    <string>GOOG</string>
    </dict>
</array>
</plist>
```


## Reading from plist file into an array

```objc
NSArray *stockList = [NSArray arrayWithContentsOfFile:@"/tmp/stocks.plist"];
```