

## What is a locale?

a locale is an identifier (id) that refers to a set of user preferences that tend to be shared across significant swaths of the world.

the data associated with this id provides support for 
1. formatting and parsing of dates, times, 
2. numbers, and currencies; 
3. for measurement units, 
4. for sort-order (collation), plus 
5. translated names for time zones, languages, countries, and scripts. 
6. support for text boundaries (character, word, line, and sentence)


Standard locale names - https://learn.microsoft.com/en-us/globalization/locale/standard-locale-names

## Unicode CLDR locale identifier vs BCP47 language tag

Unicode CLDR local identifier uses underscores (`_`) and BCP language tag uses hyphens (`-`)

| --- | --- | --- | 
| Unicode CLDR locale identifier |	BCP 47 language tag | 	Comments |
| en_US              |	en-US	| change separator |
| de_DE_u_co_phonebk |	de-DE-u-co-phonebk |	change separator |
| root	             | und	 | change to "und" |
| root_u_cu_usd      |	und-u-cu-usd	 | change to "und" |
| Latn_DE            |	und-Latn-DE	 | add "und" |

