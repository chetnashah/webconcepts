
Define a list of values, but you want to allow only one to be hold by a variable 

https://nshipster.com/ns_enum-ns_options/

https://stackoverflow.com/questions/707512/what-is-a-typedef-enum-in-objective-c

## typedef is used for type aliasing

The typedef function is used to assign the new name to the datatype. So that you can use a custom name for predefined long names of the datatypes.

typedef syntax is `typdef existing-type alias`.

### c-style enum

```objc
typedef enum {
    kCircle,
    kRectangle,
    kOblateSpheroid
} ShapeType;

ShapeType s1 = kCircle;
```

## NS_ENUM (Apple provided macro for enums)
 
We specify both the backing type and name of the enum in `typedef NS_ENUM(backingType, enumName) { /* enum declarations */ }`.

`NS_ENUM` is apple provided macro to manage enums.

```objc
typedef NS_ENUM(int, VideoGameType) {
    RPGType,
    FPSType,
    StrategyType
};

int main() {
    VideoGameType vgt = FPSType;
    NSLog(@"videogame type selected = %d", vgt);

    // matching on enum using switch
    switch(vgt) {
        case RPGType:
            NSLog(@"An rpg game was selected");
            break;
        case FPSType:
            NSLog(@"An FPS game was selected");
            break;
        case StrategyType:
            NSLog(@"An strategy type game was selected");
            break;
    }


}
```

## Enums are useful with switch for matching


## NS_OPTIONS

```objc
typedef NS_OPTIONS(NSInteger, EntityCategory) {
    EntityCategoryPlayer = 1 << 0;
    EntityCategoryAsteroid = 1 << 1;
    EntityCategoryAlien = 1 << 2;
};
int main() {
    EntityCategory category = EntityCategoryEnemy | EntityCategoryAlien; // set both bits for enemy and alien

    if(category & EntityCategoryEnemy) { // checking against an option flag
        // do something with enemy
    }
}
```
