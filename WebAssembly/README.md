
WASM is based on stack machine architecture

## wabt is the toolkit to work with webassembly

https://github.com/WebAssembly/wabt?tab=readme-ov-file


## `.wat` is the text format for webassembly, `.wasm` is the binary format

## Convert wat to wasm

```bash
wabt/bin/wat2wasm <file>.wat
```

## Syntax uses S-expressions

https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Understanding_the_text_format#s-expressions

### Sample module for addiiton
```wat
(module
  (func $add (param $lhs i32) (param $rhs i32) (result i32)
    local.get $lhs
    local.get $rhs
    i32.add)
  (export "add" (func $add))
)
```

## Loading webassembly in browser

Load it via JS
```javascript
async function start() {
    const response = await fetch('./add.wasm');
    const bytes = await response.arrayBuffer();
    const module = await WebAssembly.compile(bytes);
    const instance = await WebAssembly.instantiate(module);
    console.log(instance.exports.add(1, 2)); // 3
}
start();
```

## Webassembly can export names and import names