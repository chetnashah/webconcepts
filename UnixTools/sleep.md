The sleep command suspends execution for a minimum of number seconds (the default, or unit s), minutes (unit m), hours (unit h), or days (unit d).
     Intervals can be written in any form allowed by strtod(3).  If multiple intervals are given, they are added together.  If the final sum is zero or
     negative, sleep exits immediately.

## Usage

```sh
sleep 10 # sleep here for 10s
```
