
### READS

Reading, filtering + sorting is lazy.
When performing queries you are returned a Results object.
Results are simply a view of your data and are not mutable.


### WRITES

Changes to objects in a Realm—creating, updating and deleting—
must take place within a write() transaction block.

