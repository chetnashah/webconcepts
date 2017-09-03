#### Literal charachters

Literally matches text you have entered.

#### Meta Charachters

  * Single MetaCharachter
    * \d - single digit
    * \w - sibgke alphanumeric charachter[A-Za-z0-9]
    * \s - single white space , space or tab charachter
    * .  - any charachter whatsoever

  * Quantifier MetaCharachter (How many of preceding)
    * \* - 0 or more  (escaped here to display correctly in preview)
    * \+ - 1 or more (escaped here to display correctly in preview)
    * ? - 0 or 1
    * {n} - match n of the preceding item.

  * Positinal MetaCharachter (Some place with respect to text)
    * ^ - start of line
    * $ - end of line
    * \b - word boundary (useful in finding words of specific length)