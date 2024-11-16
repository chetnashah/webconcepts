
## Analyzing patterns from metrics and acting on it

Basically alerting or monitoring is about analyzing patterns from metrics and acting on it.
1. Perf monitoring - CPU, memory, disk, network
2. Security monitoring - Intrusion detection, log analysis
3. Usage/Purchses/Actions - User activity, sales, etc.

## Alerting - Thresholds on Monitors to alert channels

Each monitor/alert has:
1. `Query` - Metric to monitor
2. `Message` - Message to alert with.

## Monitors on metrics

e.g. `system.cpu.idle` metric
### Detection methods

1. Thresholds
2. Anomaly detection
3. Change alerting

## Notification messages can contain variable names
e.g. `cpu is too high on {{ host.name }}`