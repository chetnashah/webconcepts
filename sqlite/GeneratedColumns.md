## Based on an expression, sqlite can auto fill content for each row

**Using the `as` keyword.**

**Note: You cannot directly insert value for generated column, only the expression given in the table will add values**

```
sqlite> create table example_gen_col (
        first_name text, 
        last_name text,
        // see this expression below!
        full_name text as (concat(first_name, ' ', last_name)) 
    ) strict;

sqlite> insert into example_gen_col (first_name, last_name) values ('jzy', 'franciz');
sqlite> select * from example_gen_col;
┌────────────┬───────────┬─────────────┐
│ first_name │ last_name │  full_name  │
├────────────┼───────────┼─────────────┤
│ jzy        │ franciz   │ jzy franciz │
└────────────┴───────────┴─────────────┘
```

## Types of generated columns

1. Virtual (Default) -calculated at runtime based on expression (not stored on disk)
2. stored generated column (takes space on disk)
