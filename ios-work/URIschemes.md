

## How are urischemes added to an iOS app?

Add following in Info.plist
```
<key>CFBundleURLTypes</key>
		<array>
			<dict>
				<key>CFBundleURLSchemes</key>
				<array>
					<string>rnintegrations</string>
				</array>
			</dict>
		</array>
```