## What a *NavigationProperty* means in OData 4.0

A *navigation property* is the CSDL-level description of a relationship
between two entity types—very similar to a foreign-key / association in a
relational model.  
It tells the client two things:

1. **Cardinality** – one-to-one vs. one-to-many, optional vs. required.  
2. **Addressability** – how the client can reach the related entities in the
   service’s URL space.

Everything else (joins, foreign keys, cascade rules, …) is an internal server
concern and is *not* part of the metadata.

---

### 1. Reading the element itself

```xml
<NavigationProperty
    Name="Friends"
    Type="Collection(Microsoft.OData.SampleService.Models.TripPin.Person)"
/>
```

• `Type="Collection(...)"`  → *many* related entities (0‒n).  
• `Type="Ns.Type"`          → *single* related entity (0‒1 if `Nullable="true"`
  or 1‒1 if `Nullable="false"`).  
• `ContainsTarget="true"`   → contained entities have **no top-level entity
  set**; they live *under* the source entity (see next section).  
• `Partner="..."`           → name of the reverse navigation property (not used
  in TripPin, but allowed by the spec).  
• `ReferentialConstraint`   → if present, reveals the FK columns that
  implement the relation (not shown in TripPin).

Example from the sample:

```xml
<NavigationProperty Name="From"
                    Type="Microsoft.OData.SampleService.Models.TripPin.Airport"
                    Nullable="false"/>
```

Meaning: every `Flight` *must* reference **exactly one** `Airport`
(the *From* airport).

---

### 2. How the property becomes reachable: *NavigationPropertyBinding*

The **entity container** tells the client where a navigation property points
inside the URL space.  Look at the `People` entity set:

```xml
<EntitySet Name="People" …>
  <NavigationPropertyBinding Path="Friends" Target="People"/>
  <NavigationPropertyBinding Path="Photo"   Target="Photos"/>
</EntitySet>
```

• For any person instance `/People('russellwhyte')`  
  • its `Friends` collection lives at `/People('russellwhyte')/Friends` and the
    containing entities are drawn from the same set `People`.  
  • its `Photo` singleton lives at `/People('russellwhyte')/Photo` and that
    entity is part of the top-level set `Photos`.

If the service omits a binding, the client cannot know where the targets live
and may have to rely on containment (`ContainsTarget="true"`) or treat the link
as opaque.

---

### 3. Containment (`ContainsTarget="true"`)

```xml
<NavigationProperty Name="Trips"
                    Type="Collection(…Trip)"
                    ContainsTarget="true"/>
```

A contained entity does **not** appear in any top-level entity set.  
Its canonical URL is always relative to its parent resource:

```
/People('russellwhyte')/Trips(1001)      -- Trip #1001 **contained** in Russell
```

Because the server owns that lifetime, the client creates or deletes it by
POSTing/DELETEing on the containment path.

---

### 4. Putting it to use – URL and query examples

1. Get a person’s friends:

```
GET /People('scottketchum')/Friends
```

2. Get those friends **together with** their photo in one round-trip:

```
GET /People('scottketchum')?$expand=Friends($expand=Photo)
```

3. Add a new trip for Russell:

```
POST /People('russellwhyte')/Trips
Content-Type: application/json
{
  "TripId"     : 2001,
  "Name"       : "Backpacking Iceland",
  "Budget"     : 1500,
  …
}
```

4. Follow a *single-valued* navigation:

```
GET /Flights(1)/Airline                 -- always returns one Airline entity
```

---

### 5. Quick mnemonic

• Collection(…)         ⇒ many.  
• Nullable="false"      ⇒ mandatory.  
• ContainsTarget="true" ⇒ addressed *under* the source entity.  
• Binding               ⇒ tells you which **entity set** backs the link.

With those four facts you can usually “make sense” of any
`<NavigationProperty>` you encounter in an OData $metadata document.