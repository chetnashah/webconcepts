In Python, a bytestring is a sequence of bytes. It is represented using the `bytes` data type. Bytestrings are immutable, meaning their values cannot be changed once created.

Here are a few ways to create a bytestring in Python:

1. Using a string literal with a `b` prefix:
```python
bytestr = b'Hello, bytestring!'
```

2. Using the `bytes()` constructor:
```python
bytestr = bytes([72, 101, 108, 108, 111])  # Equivalent to b'Hello'
```

3. By encoding a string using a specific character encoding:
```python
bytestr = 'Hello'.encode('utf-8')  # Encodes the string as UTF-8 bytestring
```

Once you have a bytestring, you can perform various operations on it:

- Accessing individual bytes:
```python
byte = bytestr[0]  # Access the first byte
```

- Slicing:
```python
slice = bytestr[1:4]  # Get a slice of the bytestring
```

- Concatenating bytestrings:
```python
new_bytestr = bytestr1 + bytestr2  # Concatenate two bytestrings
```

- Converting a bytestring to a string:
```python
string = bytestr.decode('utf-8')  # Decode the bytestring as a string using UTF-8
```

- Checking the length:
```python
length = len(bytestr)  # Get the length of the bytestring
```

It's important to note that bytestrings are different from Unicode strings (`str` type) in Python. Bytestrings represent raw binary data, while Unicode strings represent text. The encoding and decoding operations are used to convert between these two representations when necessary.

Bytestrings are commonly used when working with binary data, such as reading and writing files, handling network protocols, or interacting with low-level data formats.