

## When writing to file, string encoding needs to be specified

A string encoding specifies how each char is stored as array of bytes.

## Declaring a mutable string

```objc
NSMutableString *str = [[NSMutableString alloc] init];
```

## Method to write to file (is built into string class)

```objc
[str writeToFile:@"/tmp/cool.txt" atomically:YES encoding:NSUTF8StringEncoding error:NULL];
```


## Reading files into string

* We can use a custom NSString initializer/constructor named `initWithContentsOfFile`.

e.g.
```objc
NSString* resolveConfContents = [[NSString alloc] initWithContentsOfFile:@"/etc/resolv.conf" encoding:NSASCIIStringEncoding error:&err];

if(!resolveConfContents) {
    NSLog(@"read failed of resolve conf: %@", [err localizedDescription]);
} else {
    NSLog(@"contents of resolve.conf are: %@", resolveConfContents);
}
```


## NSURL is different from NSString

**NSURL** is used to represent a URL.

To create an `NSURL` from a `NSString`,
use `[NSURL URLWithString:url_string]`

## NSData objects (for representing URL response data buffer)

**An `NSData` object represents a buffer of bytes.**, for a mutable buffer, use `NSMutableData`, which has method `appendData:data`.

IN order to deserialize `NSData` instance, we will pass it to JSONSerialization classes.


```objc
NSData *data = [NSData dataWithContentsOfURL:[NSURL URLWithString:@"https://httpbin.org/get"]];
NSMutableArray *json = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:&err];
NSLog(@"api returned data: %@", json);
```

### Read NSData i.e. buffer data from file

```objc
NSData *readData = [NSData dataWithContentsOfFile:@"/tmp/google.png"];
NSLog(@"The file read from the disk has %lu bytes",
(unsigned long)[readData length]);
```

### NSURLRequest

represents a request object that is not yet sent.
needs/depends on an NSURL to initiaized.

### NSURLConnection (deprecated, prefer NSURLSession)

Makes an url request to a remote url, and returns an `NSData` buffer object.

Fetching data and writing to disk sync with `NSURLConnection` and `NSData` and `NSURLRequest`.

```objc
NSURL *googleurl = [NSURL URLWithString:@"http://www.google.com/images/logos/ps_logo2.png"];
NSURLRequest *req = [NSURLRequest requestWithURL:googleurl];
// sync request, returns buffer data
NSData *googImgData = [NSURLConnection sendSynchronousRequest:req returningResponse:NULL error:&err];

if(!googImgData) {
    NSLog(@"goog img request failed");
}

BOOL written = [googImgData writeToFile:@"/tmp/google.png" atomically:YES];
if(!written) {
    NSLog(@"error writing gogo img");
}
```

Delegates for async stuff - Delegates of `NSURLConnection` objects should implement either the `NSURLConnectionDataDelegate` or `NSURLConnectionDownloadDelegate` protocol in addition to the `NSURLConnectionDelegate` protocol.

e.g.
```objc
// logger/delegate impl
// BNRLogger.h
@interface BNRLogger : NSObject <NSURLConnectionDelegate, NSURLConnectionDataDelegate>

- (NSString*) lastTimeString;
- (void)updateLastTime:(NSTimer*)timer;

@end


// BNRLogger.m
@implementation BNRLogger {
    NSDate* _lastTime;
}
- (void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response {
    NSLog(@"connection didReceiveResponse: %@", response);
}
- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data {
    NSLog(@"didReceiveData: %@", data);
}
@end


// usage in main.m
BNRLogger* bnrlogger = [[BNRLogger alloc] init];

NSURL *url = [NSURL URLWithString:@"http://www.gutenber.org/cache/epub/205/pg205.txt"];
NSURLRequest* request = [NSURLRequest requestWithURL:url];
NSURLConnection *fetchConn = [[NSURLConnection alloc] initWithRequest:request delegate:bnrlogger];
```


### NSURLSession



