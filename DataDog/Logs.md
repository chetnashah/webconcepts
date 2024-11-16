
## A log is a usage event/record of something that happened in the system

## Why logs are important

1. compliance
2. security
3. Deeper dive into metrics to diagnose issues
4. Troubleshooting
5. log content counting/monitors/alerting

## Log sources

1. Server applications
2. Mobile apps
3. Web apps
4. IoT devices
5. Containers

## Log retention
Following dictate how much to retain:
1. Usefulnes
2. Compliance
3. Cost

## Log support monitors/alerts based on query

1. by count aggregation of logs

## Try to avoid logging sensitive data

## Filtering

1. Use facets/tags
2. Use query language

## Grouping

Logs can be grouped into:
1. Fields - Only `count (of all logs)` is supported for events, `count unique of`,
and `avg` for numerical measures.. with group by tags/facets.
2. Patterns
3. Transactions

## Event attributes vs tags

1. Event attributes are the data dict that is logged explicitly
2. Tags are the data that is inferred as part of environment of logger or user/

## Associated traces and metrics
Logs can show associated traces and metrics in the log detail view.

## SEarching

Use `*:search_term` to perform a full text search across all log attributes including log message.
e.g. `*:prod` will search all log attributes that contain value prod
`*:prod*` will search all log attributes that start with prod e.g. `service:product-invenotry` and `env:prod`
