// Learning from coding train channel on youtube

#### Single Match vs Multiple matches

By default all regex engines only return the first/leftmost match.
This regex can match the second a too. It only does so when you tell the regex engine to start searching through the string after the first match. In a text editor, you can do so by using its "Find Next" or "Search Forward" function. In a programming language, there is usually a separate function that you can call to continue searching through the string after the previous match.

#### Case sensitivity in matching

Note that regex engines are case sensitive by default. cat does not match Cat, unless you tell the regex engine to ignore differences in case.


#### Literal charachters

Literally matches text you have entered.

#### Meta Charachters

  * Single MetaCharachter
    * \d - single digit  (this is shorthand for charachter class [0-9])
    * \w - single alphanumeric charachter [A-Za-z0-9] also known as word charachters
    * \s - single white space , space/tab/newline/formfeed (shorthand for [ \t\n\r\f])
    * .  - any charachter whatsoever

    Here \d, \w and \s are known as shorthand charachter classes, since they are short for given charachter classes. 
    
    * Note about shorthand charachter classes: Shorthand character classes can be used both inside and outside the square brackets. \s\d matches a whitespace character followed by a digit. [\s\d] matches a single character that is either whitespace or a digit.

    * By default .* is greedy, in order to make it not greedy, use .*? 
    * Note: The dot charachter (.) matches all charachters except linebreak.


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

**NOTE** : Inside charachter class square brackets, no need to escape meta charachter,
that is metacharachters inside square brackets are matched literally.

The only special charachters inside square backets/charachter classes are right bracket ],
hyphen -,
caret ^

All the meta charachters are treated literally inside charachter classes e.g. regex [+*] matches plus charachter followed by a star charachter nothing else.

#### Optional Metacharachter (question mark) is greedy

The question mark is the first metacharacter introduced by this tutorial that is greedy. The question mark gives the regex engine two choices: try to match the part the question mark applies to, or do not try to match it. The engine always tries to match that part. Only if this causes the entire regular expression to fail, will the engine try ignoring the part the question mark applies to.

The effect is that if you apply the regex Feb 23(rd)? to the string Today is Feb 23rd, 2003, the match is always Feb 23rd and not Feb 23.

#### Alternation (in Detail)

 the regex engine is eager(return fist match). It stops searching as soon as it finds a valid match. The consequence is that in certain situations, the order of the alternatives matters. Suppose you want to use a regex to match a list of function names in a programming language: Get, GetValue, Set or SetValue. The obvious solution is Get|GetValue|Set|SetValue. Let's see how this works out when the string is SetValue.

Set is matched and return since it's one of them in pattern.

Solution:
1. Order matters, put SetValue before Set, i.e. pattern should be Get|GetValue|SetValue|Set
2. Use Get(Value)?|Set(Value)?
You can make several tokens optional by grouping them together using parentheses, and placing the question mark after the closing parenthesis. E.g.: Nov(ember)? matches Nov and November.

#### Group capturing(using round parantheses) and backreferences

**Note** When closing parenthesis is followed by question mark, it does not mean group caturing.

These are used to capture the match or parts of match that can be useful in things like find and replace, or within the regex itself etc.
$0 = full regex match
$1, $2 .. = groups specified via round parantheses and can be used in replace
\1, \2 .. = captured groups can be used in the regex once captured.

Parentheses around any part of the regular expression pattern causes that part of the matched substring to be remembered (storage)


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

#### word boundaries

The metacharacter \b is an anchor like the caret and the dollar sign. It matches at a position that is called a "word boundary". This match is zero-length.

There are three different positions that qualify as word boundaries:

Before the first character in the string, if the first character is a word character.
After the last character in the string, if the last character is a word character.
Between two characters in the string, where one is a word character and the other is not a word character.


### Regex in pcre

### Regex in POSIX

There are a number of differences between POSIX regex and PCRE regex. This page lists the most notable ones that are necessary to know when converting to PCRE.

* The PCRE functions require that the pattern is enclosed by delimiters.

* Unlike POSIX, the PCRE extension does not have dedicated functions for case-insensitive matching. Instead, this is supported using the i (PCRE_CASELESS) pattern modifier. Other pattern modifiers are also available for changing the matching strategy.

* The POSIX functions find the longest of the leftmost match, but PCRE stops on the first valid match. If the string doesn't match at all it makes no difference, but if it matches it may have dramatic effects on both the resulting match and the matching speed. To illustrate this difference, consider the following example from "Mastering Regular Expressions" by Jeffrey Friedl. Using the pattern one(self)?(selfsufficient)? on the string oneselfsufficient with PCRE will result in matching oneself, but using POSIX the result will be the full string oneselfsufficient. Both (sub)strings match the original string, but POSIX requires that the longest be the result.

* The POSIX definition of a "character class" differs from that of PCRE. Simple bracket expressions to match a set of explicit characters are supported in the form of PCRE character classes but POSIX collating elements, character classes and character equivalents are not supported. Supplying an expression with a character class that both starts and ends with :, . or = characters to PCRE is interpreted as an attempt to use one of these unsupported features and causes a compilation error.


### Regex in editors

