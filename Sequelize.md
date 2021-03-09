
### Associations

```js
User.hasOne(Project);

User.hasMany(Task); // Will add userId to Task model
Task.belongsTo(User); // Will also add userId to Task model
```
User model (the model that the function is being invoked on) is the `source`. Project model (the model being passed as an argument) is the `target`.

When you create associations between your models in sequelize, foreign key references with constraints will automatically be created along with constraints and all.

https://medium.com/@andrewoons/how-to-define-sequelize-associations-using-migrations-de4333bf75a7

#### 4 types of associations

1. BelongsTo: belongsTo relation ‘adds a foreign key and singular association mixins to the source’
2. HasOne: When defining a hasOne relation ‘the foreign key is added on the target’.

3. HasMany: creates a 1:m association between the source and the provided target. The foreign key is added on the target
4. BelongsToMany: belongsToMany relation creates a n:m association through a join table


### Migrations
Treat migrations like a commit or a log for some change in database.
All migrations sit in the `migrations` folder.
Files in this folder should be created by the `sequelize-cli` tool via `model:generate` or `migration:generate` and not by hand
e.g generated file looks like: `XXXXXXXXXXXXXX-create-user.js `
#### SequelizeMeta Table

Holds record of all the migrations that have taken place


#### migration file

```js
module.exports = {
  up: (queryInterface, Sequelize) => {
    // logic for transforming into the new state
  },
  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
  }
}
```

#### Running migration

run via cli using `db:migrate` command
