https://www.launchd.info/

launchd as "a unified, open-source service management framework for starting, stopping and managing daemons, applications, processes, and scripts.

### Agents vs Daemons
launchd differentiates between agents and daemons. The main difference is that an agent is run on behalf of the logged in user while a daemon runs on behalf of the root user or any user you specify with the UserName key.


|--Type--|--	Location --|--	Run on behalf of --|
|User Agents	| ~/Library/LaunchAgents |	Currently logged in user
|Global Agents	| /Library/LaunchAgents	| Currently logged in user
|Global Daemons	| /Library/LaunchDaemons | 	root or the user specified with the key UserName
|System Agents	| /System/Library/LaunchAgents |	Currently logged in user
|System Daemons	| /System/Library/LaunchDaemons	| root or the user specified with the key UserName


The behavior of a daemon/agent is specified in a special XML file called a property list i.e. a `plist` file. Depending on where it is stored it will be treated as a daemon or an agent.

e.g.
`Label`: This key is required for every job definition. It identifies the job and has to be unique for the launchd instance. Theoretically it is possible for an agent to have the same label as a daemon, as daemons are loaded by the root launchd whereas agents are loaded by a user launchd, but it is not recommended.

`Program`: This key defines what to start, in this case a shell script /Users/Me/Scripts/cleanup.sh.

`RunAtLoad`: This is one of several optional keys specifying when the job should be run, in this case right after it has been loaded.

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
	<dict>
		<key>Label</key>
		<string>com.example.app</string>
		<key>Program</key>
		<string>/Users/Me/Scripts/cleanup.sh</string>
		<key>RunAtLoad</key>
		<true/>
	</dict>
</plist>
```

### Automatic Loading of Job Definitions
Upon system start the root launchd process will scan the daemon directories `/System/Library/LaunchDaemons` and `/Library/LaunchDaemons` for job definitions and load them depending on the existence/value of the Disabled key and the contents of the override database.

When a user logs in a new launchd process will be started for this user. This launchd process will scan the agent directories `/System/Library/LaunchAgents`, `/Library/LaunchAgents` and `~/Library/LaunchAgents` for job definitions and load them depending on the existence/value of the `Disabled` key and the contents of the override database.

### Loading vs Starting
Loading a job definition does not necessarily mean to start the job. When a job is started is determined by the job definition. In fact, only when RunAtLoad or KeepAlive have been specified, launchd will start the job unconditionally when it has been loaded.

### launchctl 

LaunchControl is a fully-featured launchd GUI allowing you to create, manage and debug system- and user services on your Mac.



