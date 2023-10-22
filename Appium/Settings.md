
## What is Settings?

Appium has introduced a set of extension APIs that **allow you to adjust parameters for a given session during session execution.**

## Settings vs Capabilities

Called "Settings", these parameters mirror the role of Capabilities, but Capabilities cannot be adjusted once a session has started. Settings can be adjusted any number of times during the course of a session.

## Usage

There are 3 important points to the concept of Settings: - 
1. Settings are mutable; they can be changed during a session using the Settings API - Settings are only relevant during the session in which they are set. 
2. They are typically reset for each new session, though depending on the driver, some settings may persist between sessions. 
3. Settings adjust the way the appium server behaves during test automation. They don't refer to settings for the device or app under test



## Endpoints


### Update Settings	

`POST /session/:id/appium/settings`	`settings (Record<string, any>)`

Update setting values. The settings object needs to be a set of keys and values, where keys are the name of the settings and values are whatever value is documented as appropriate for that setting.	null


### Get Settings	
`GET /session/:id/appium/settings`		

Return the current settings.	Return type - `Record<string, any>`

