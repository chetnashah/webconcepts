plutil (property list utility) is a versatile tool for plist manipulation with these key capabilities:

Core Operations:
```bash
# Validate plist
plutil -lint file.plist

# Convert between formats
plutil -convert xml1 file.plist    # To XML
plutil -convert binary1 file.plist # To binary
plutil -convert json file.plist    # To JSON

# Extract value
plutil -extract keyPath format file.plist
plutil -p file.plist              # Pretty print

# Modify values
plutil -replace keyPath -string "value" file.plist
plutil -replace keyPath -integer 123 file.plist
plutil -replace keyPath -bool YES file.plist
```

Value Types Supported:
- string
- integer
- float
- bool
- date
- data
- array
- dict

Common Usage Examples:
```bash
# Modify nested values
plutil -replace Env.API_URL -string "https://api.example.com" config.plist

# Work with arrays
plutil -insert Features.- -string "newFeature" config.plist   # Append
plutil -remove Features.2 config.plist                        # Remove by index

# Create new plist
plutil -create xml1 -o new.plist

# Debug/inspect
plutil -lint file.plist    # Check syntax
plutil -p file.plist       # Print readable format
```

Would you like specific examples for any of these operations?