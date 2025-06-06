
## Core concepts

1. `DbContext` instance represents a DB
2. Create a model POCO class for each table e.g. `Blog`, `Post`, `Product`, `Order` etc. 
3. Use `DbSet<T>` to represent a table in the context, where `T` is the model class created above e.g. `DbSet<Blog> Blogs { get; set; }` is a table for `Blog` model. A `DbSet<T> tableName` is usually a property in the `DbContext` class.

```csharp
public class BloggingContext : DbContext
{
    // Blog table and Post table
    public DbSet<Blog> Blogs { get; set; }
    public DbSet<Post> Posts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("YourConnectionStringHere");
    }
}
```

## Install dotnet-ef as a global tool

It is used to generate migrations, update the database, and perform other EF Core tasks like scaffolding (auto gen model classes from an existing database).

```pwsh
dotnet tool install --global dotnet-ef
```