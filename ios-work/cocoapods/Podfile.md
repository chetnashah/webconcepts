
## Written in Ruby

You can bring in arbitrary logic by using `require()`.
e.g.
```rb
# see required file that can define functions etc
require File.join(File.dirname(`node --print "require.resolve('expo/package.json')"`), "scripts/autolinking")
require_relative '../node_modules/react-native/scripts/react_native_pods'
require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'

platform :ios, '13.0'
install! 'cocoapods', :deterministic_uuids => false

target 'OneSignalNotificationServiceExtension' do
  pod 'OneSignalXCFramework', '>= 3.0', '< 4.0'
end

target 'RNIntegrations' do
  use_expo_modules!
  post_integrate do |installer|
    begin
      expo_patch_react_imports!(installer)
  	rescue => e
  	  Pod::UI.warn e
  	end
  end
  config = use_native_modules!

  # Flags change depending on the env values.
  flags = get_default_flags()

  use_react_native!(
    :path => config[:reactNativePath],
    # Hermes is now enabled by default. Disable by setting this flag to false.
    # Upcoming versions of React Native may rely on get_default_flags(), but
    # we make it explicit here to aid in the React Native upgrade process.
    :hermes_enabled => true,
    :fabric_enabled => flags[:fabric_enabled],
    # Enables Flipper.
    #
    # Note that if you have use_frameworks! enabled, Flipper will not work and
    # you should disable the next line.
    :flipper_configuration => FlipperConfiguration.enabled,
    # An absolute path to your application root.
    :app_path => "#{Pod::Config.instance.installation_root}/.."
  )


  post_install do |installer|
    react_native_post_install(
      installer,
      # Set `mac_catalyst_enabled` to `true` in order to apply patches
      # necessary for Mac Catalyst builds
      :mac_catalyst_enabled => false
    )
    installer.pods_project.build_configurations.each do |config|
      config.build_settings["EXCLUDED_ARCHS[sdk=iphonesimulator*]"] = "arm64"
    end
    __apply_Xcode_12_5_M1_post_install_workaround(installer)
  end
end
```

## hooks

### post_install
This hook allows you to make any last changes to the generated Xcode project before it is written to disk, or any other tasks you might want to perform.

It receives the `[Pod::Installer]` as its only argument.

Examples:
Customizing the build settings of all targets.
```
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['GCC_ENABLE_OBJC_GC'] = 'supported'
    end
  end
end
```
### post_integrate
This hook allows you to make changes after the project is written to disk.

It receives the `[Pod::Installer]` as its only argument.

Examples:
Customizing the build settings of all targets
```
post_integrate do |installer|
  # some change after project write to disk
end
```