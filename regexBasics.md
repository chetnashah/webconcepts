// Learning from coding train channel on youtube

#### Literal charachters

Literally matches text you have entered.

#### Meta Charachters

  * Single MetaCharachter
    * \d - single digit  (this is shorthand for charachter class [0-9])
    * \w - single alphanumeric charachter [A-Za-z0-9]
    * \s - single white space , space/tab/newline/formfeed (shorthand for [ \t\n\r\f])
    * .  - any charachter whatsoever

    Here \d, \w and \s are known as shorthand charachter classes, since they are short for given charachter classes. 
    
    * Note about shorthand charachter classes: Shorthand character classes can be used both inside and outside the square brackets. \s\d matches a whitespace character followed by a digit. [\s\d] matches a single character that is either whitespace or a digit.

    * By default .* is greedy, in order to make it not greedy, use .*? 


  * Quantifier MetaCharachter (How many of preceding)
    * \* - 0 or more  (escaped here to display correctly in preview)
    * \+ - 1 or more (escaped here to display correctly in preview)
    * ? - 0 or 1
    * {n} - match n of the preceding item.

  * Positinal MetaCharachter (Some place with respect to text)
    * ^ - start of line
    * $ - end of line
    * \b - word boundary (useful in finding words of specific length)


#### Charachter classes(square brackets) and alternation(pipe sign)

By using square brackets/ charachter class, you tell regex engine to use to match any one of the charachters in charachter class. So basically a charachter class matches a single charachter which will be anyone of characchter specified inside of charachter class e.g. gr[ae]y will match grey and gray but as you see [ae] represents only one charachter matched.
Tip: when you have alternation between charachters for a single charachter, use a charachter class.

Inside charachter class square brackets, no need to escape meta charachter,
that is metacharachters inside square brackets are matched literally.

The only special charachters inside square backets/charachter classes are right bracket ],
hyphen -,
caret ^

All the meta charachters are treated literally inside charachter classes e.g. regex [+*] matches plus charachter followed by a star charachter nothing else.

#### Group capturing(using round parantheses) and backreferences

These are used to capture the match or parts of match that can be useful in things like find and replace, or within the regex itself etc.
$0 = full regex match
$1, $2 .. = groups specified via round parantheses and can be used in replace
\1, \2 .. = captured groups can be used in the regex once captured.




### Regex in Javascript:

by default regex functions will usually do the first match only,
for all matches, use global flag.

regex can be initialized within forward slashes
e.g.
``` js
var r = /[a-z]+/;
```

There are flags associated with regex:
1. global (g) - don't just match first match, get all the matches.

flags are given after the regexp's last forward slash:
``` js
var r2 = /[a-z]+/g;
```

Regexp object - has a test() method takes a string and returns boolean whether a match was found. has a exec() method that takes a string and returns matches one by one.
String - has a match() method which takes a regexp objects and returns array of matches(strings)


### Regex in pcre

### Regex in grep

### Regex in POSIX

### Regex in editors

