
## What is spatial system?

A spatial system is a set of rules for how you `measure`, `size`, and `space` your UI elements. 

**Uniformity** on a spatial level allows your product to be more consistent, your team to communicate better, and reduce the number of decisions designers have to make in a day. 

One example of a spatial system is **the 8pt grid.** However, there are many variations and configurations to choose from.

## Number of variables

Choosing a smaller base unit like 4pt, 5pt, or 6pt can open you up to too many variables in your system. It becomes more difficult to eyeball the difference between a 12pt and 16pt padding difference, which can make it hard to enforce consistency across a team. 

8pt increments are the right balance of being visually distant while having a reasonable number of variables. utilize a half unit of 4pts for spacing icons or adjusting small blocks of text.

## Applying spatial system

### Element first (strict element sizing)

the sizing of solid elements takes priority when matched to your predetermined spatial system.. This includes things like buttons and form inputs.

e.g. `button height 48 pts`.

### Content/padding first

When the `content is less predictable and we care about its display`, we will want to **enforce strict internal padding** and allow element sizes to be dictated by their content. 

These element’s sizes may still fall into your spatial system’s rules but that is secondary to the spacing around the content. 

e.g. `padding 8 pts, total height/width can be subject to content`.