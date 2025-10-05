
---

# The big picture (what Dataverse stores for a column)

Under the hood every column (“attribute”) has **metadata** derived from a base class:

```
MetadataBase
└─ AttributeMetadata                ← all columns inherit this
   ├─ *Scalar/Text/Number/Date*     ← e.g., String, Integer, DateTime, Decimal, Double, BigInt
   ├─ *Choices*                     ← Picklist (single), MultiSelectPicklist
   ├─ *Booleans & States*           ← Boolean, State, Status
   ├─ *Identifiers*                 ← UniqueIdentifier (GUID), EntityName (stores a table name)
   ├─ *Money / Memo*                ← Money, Memo
   ├─ *Lookup family*               ← Lookup, Customer, Owner, (Custom) Multi-table Lookup
   ├─ *Party list*                  ← PartyList (special activity-party list)
   ├─ *Binary/special*              ← File, Image
   ├─ *Virtual/Managed Props*       ← Virtual, ManagedProperty
```

All of these appear as **subtypes of `AttributeMetadata`** (or related “complex” metadata types for some special cases). Microsoft’s Web API metadata reference and SDK docs are the canonical maps. ([Microsoft Learn][1])

---

# The concrete types you’ll meet (SDK/Web API)

## 1) Core subclasses of `AttributeMetadata`

You’ll see pages for each of these in the Web API reference (or SDK):

* **Text / number / date**

  * `StringAttributeMetadata`, `MemoAttributeMetadata`
  * `IntegerAttributeMetadata`, `DecimalAttributeMetadata`, `DoubleAttributeMetadata`, `BigIntAttributeMetadata`
  * `DateTimeAttributeMetadata`  ([Microsoft Learn][2])
* **Choices**

  * `PicklistAttributeMetadata` (single choice)
  * `MultiSelectPicklistAttributeMetadata` (multi-select choice) ([Microsoft Learn][3])
* **Booleans & state**

  * `BooleanAttributeMetadata`
  * `StateAttributeMetadata` and `StatusAttributeMetadata` (system state/status fields) ([Microsoft Learn][2])
* **Identifiers**

  * `UniqueIdentifierAttributeMetadata` (GUIDs)
  * `EntityNameAttributeMetadata` (stores a *table logical name* as data) ([Microsoft Learn][1])
* **Money / long text**

  * `MoneyAttributeMetadata`, `MemoAttributeMetadata` ([Microsoft Learn][2])
* **Lookup family (single reference or polymorphic)**

  * `LookupAttributeMetadata` (single target)
  * **Built-in polymorphic lookups** (still `LookupAttributeMetadata` but with multiple `Targets`):

    * **Customer** (Account or Contact)
    * **Owner** (SystemUser or Team)
    * **Regarding** (many “activity-enabled” tables)
  * **Custom multi-table lookup** (polymorphic you define): represented with **`ComplexLookupAttributeMetadata`** when creating via Web API. ([Microsoft Learn][4])
* **Party list (multi-value lookup)**

  * `PartyList` shows up in the **enum** (see below). It’s a special activity-party list (To/CC/Attendees). You don’t create arbitrary partylists; they’re tied to activity types. ([community.dynamics.com][5])
* **Binary / special**

  * `FileAttributeMetadata` (file columns)
  * `ImageAttributeMetadata` (primary/thumbnail images) ([Microsoft Learn][6])
* **Other**

  * `ManagedPropertyAttributeMetadata`
  * `VirtualAttributeMetadata` (values computed/virtualized) ([Microsoft Learn][7])

> Where to see a catalog: the “metadata entity types” and complex types sections list these classes and their inheritance. ([Microsoft Learn][8])

---

## 2) `AttributeTypeCode` (the enum “what kind of thing is it?”)

Alongside classes, Dataverse also exposes an **enum** that labels the attribute’s conceptual type (handy in metadata filters):

```
Boolean, Customer, DateTime, Decimal, Double, Integer, Lookup, Memo,
Money, Owner, PartyList, Picklist, State, Status, String, ...
```

You’ll see it as **`AttributeTypeCode`** in SDK or Web API metadata. If you filter metadata, you compare against these names. (In Web API filters, include the enum’s namespace.) ([Microsoft Learn][9])

**Rule of thumb:**

* *One target lookup* → `AttributeTypeCode = Lookup`
* *Polymorphic lookups* → still a lookup under the hood, but:

  * `Customer` = Account/Contact
  * `Owner` = SystemUser/Team
  * `PartyList` = activity parties (multi-value)
  * Generic polymorphism you create is reflected by multiple **Targets** on the lookup attribute (see below). ([Microsoft Learn][9])

---

## 3) `AttributeTypeName` (fine-grained label)

You’ll also see `AttributeTypeName.Value` strings like `StringType`, `OwnerType`, `LookupType`, `FileType`, `MultiSelectPicklistType`, etc. Treat this as a **more specific descriptor** complementing `AttributeTypeCode`. ([Microsoft Learn][1])

---

# How to *recognize* and *use* each type at query time

### A) Detecting polymorphic vs normal lookups

* Ask metadata for the attribute and **expand `Targets`**:

  * **1 entry** in `Targets` ⇒ normal lookup
  * **>1 entries** ⇒ polymorphic (multi-table) lookup
    Example (owner on account):
    `EntityDefinitions('account')/Attributes('ownerid')/Microsoft.Dynamics.CRM.LookupAttributeMetadata?$expand=Targets` → `["systemuser","team"]`. ([Microsoft Learn][1])

* For **custom multi-table lookups**, creation uses `ComplexLookupAttributeMetadata` and results in a lookup with multiple `Targets` + multiple 1\:N relationships under the hood. ([Microsoft Learn][4])

* When retrieving **row data**, opt into OData annotations to get the **actual type** used for that row:
  `Prefer: odata.include-annotations="Microsoft.Dynamics.CRM.lookuplogicalname"` → you’ll see `_field_value@Microsoft.Dynamics.CRM.lookuplogicalname`. ([Microsoft Learn][10])

### B) PartyList specifics

* It’s **not** a simple lookup; it’s a list of “activity party” records (recipients/attendees). Many tools handle it specially; you don’t create arbitrary PartyList columns. Expect different read/write patterns vs lookups. ([community.dynamics.com][5])

### C) File & Image

* File columns surface via `FileAttributeMetadata` and have **special endpoints** for upload/download; not a simple string/binary in normal GET. ([Microsoft Learn][6])

### D) Filtering metadata by enums

* When filtering metadata with enum properties (e.g., `OwnershipType`, `AttributeType`), **prefix the enum type’s namespace** in the `$filter` value (Web API quirk). ([Microsoft Learn][10])

---

# A compact visual to memorize

Think of three stacks:

```
[Classes: “what object it is”]              [Enum code: “what kind”]          [Name: “fine label”]
---------------------------------------------------------------------------------------------------
StringAttributeMetadata                      String                           StringType
Integer/Decimal/Double/BigIntAttribute...    Integer/Decimal/Double/BigInt    (…Type)
DateTimeAttributeMetadata                    DateTime                         DateTimeType
MemoAttributeMetadata                        Memo                             MemoType
MoneyAttributeMetadata                       Money                            MoneyType
BooleanAttributeMetadata                     Boolean                          BooleanType
PicklistAttributeMetadata                    Picklist                         PicklistType
MultiSelectPicklistAttributeMetadata         (MultiSelectPicklist)            MultiSelectPicklistType
StateAttributeMetadata                       State                            StateType
StatusAttributeMetadata                      Status                           StatusType
UniqueIdentifierAttributeMetadata            Uniqueidentifier                 UniqueidentifierType
EntityNameAttributeMetadata                  (EntityName)                     EntityNameType
LookupAttributeMetadata (single target)      Lookup                           LookupType
LookupAttributeMetadata + Targets>1          Customer/Owner/… or generic      (OwnerType/CustomerType/LookupType)
PartyList (activity parties)                 PartyList                         PartyListType
FileAttributeMetadata                        (File)                           FileType
ImageAttributeMetadata                       (Image)                          ImageType
ManagedPropertyAttributeMetadata             (ManagedProperty)                ManagedPropertyType
VirtualAttributeMetadata                     (Virtual)                        VirtualType
```

Use it like a **decoder ring**: the class tells you *behavioral capabilities*, the enum tells you *category*, and the name gives the *fine-grained label*. ([Microsoft Learn][1])

---

# Handy queries/snippets you’ll reuse

* **List all attributes for a table with types**
  `GET /api/data/v9.2/EntityDefinitions(LogicalName='account')/Attributes?$select=LogicalName,AttributeType,AttributeTypeName&$top=500`
  (Project locally; the pair `AttributeType` + `AttributeTypeName/Value` is gold.) ([Microsoft Learn][1])

* **Check if a lookup is polymorphic**
  `.../Attributes(LogicalName='ownerid')/Microsoft.Dynamics.CRM.LookupAttributeMetadata?$select=LogicalName&$expand=Targets` (Targets > 1 ⇒ polymorphic) ([Microsoft Learn][1])

* **Filter metadata by enum** (note namespace)
  `.../EntityDefinitions?$filter=OwnershipType eq Microsoft.Dynamics.CRM.OwnershipTypes'UserOwned'` ([Microsoft Learn][10])

* **File column metadata**
  `.../Attributes(LogicalName='myfile')/Microsoft.Dynamics.CRM.FileAttributeMetadata` (then use file APIs for content) ([Microsoft Learn][6])

---

## Gotchas you’ll thank yourself for remembering

* **Polymorphic confusions:** `Customer` and `Owner` *are* lookups, just **polymorphic** ones. Don’t treat them like single-target lookups in code or UI—branch on target type. ([Microsoft Learn][9])
* **PartyList is special:** not “a lookup”; it’s a list of activity parties. Reading/writing needs activity-party semantics (e.g., email recipients), and several connectors don’t treat it like a normal field. ([proMX][11])
* **Enum filtering in metadata:** always use the **namespace-qualified** enum literal in `$filter`. Otherwise, your query silently returns nothing. ([Microsoft Learn][10])
* **File/Image aren’t simple strings:** use the dedicated endpoints/operations; expect larger payload patterns and permissions nuances. ([community.dynamics.com][12])
* **Custom multi-table lookup creation is API-first:** create via Web API/SDK (`ComplexLookupAttributeMetadata` / multi-relationship payload), then you’ll see multiple `Targets` in metadata and one nav per target in `$metadata`. UI support is still catching up. ([Microsoft Learn][4])

---

If you want, I can generate a quick **script of Web API calls** you can run in Postman to dump the attribute roster for a given table, highlight polymorphic lookups (by `Targets`), and tabulate `AttributeType` vs `AttributeTypeName` for fast inspection.

[1]: https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/reference/attributemetadata?view=dataverse-latest&utm_source=chatgpt.com "AttributeMetadata EntityType (Microsoft.Dynamics.CRM)"
[2]: https://learn.microsoft.com/en-us/power-apps/developer/data-platform/org-service/metadata-attributemetadata?utm_source=chatgpt.com "Work with column definitions - Dataverse"
[3]: https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/reference/multiselectpicklistattributemetadata?view=dataverse-latest&utm_source=chatgpt.com "MultiSelectPicklistAttributeMetad..."
[4]: https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/reference/complexlookupattributemetadata?view=dataverse-latest&utm_source=chatgpt.com "ComplexLookupAttributeMetadata ComplexType"
[5]: https://community.dynamics.com/forums/thread/details/?threadid=d0985741-ed11-41b9-a4ae-470375d4c70d&utm_source=chatgpt.com "Partylist lookup & Normal Lookup - Dynamics 365 Community"
[6]: https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/reference/fileattributemetadata?view=dataverse-latest&utm_source=chatgpt.com "FileAttributeMetadata EntityType (Microsoft.Dynamics.CRM)"
[7]: https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/reference/complextypes?view=dataverse-latest&utm_source=chatgpt.com "Microsoft Dataverse Web API Complex Type Reference"
[8]: https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/reference/metadataentitytypes?view=dataverse-latest&utm_source=chatgpt.com "Web API Metadata Entity Type Reference"
[9]: https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/reference/attributetypecode?view=dataverse-latest&utm_source=chatgpt.com "AttributeTypeCode EnumType (Microsoft.Dynamics.CRM)"
[10]: https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/query-metadata-web-api?utm_source=chatgpt.com "Query table definitions using the Web API"
[11]: https://promx.net/en/2020/01/how-to-retrieve-an-activity-party-list-in-microsoft-dynamics-365-using-web-api/?utm_source=chatgpt.com "How to Retrieve an Activity Party List in Microsoft Dynamics 365 Using Web API - proMX AG"
[12]: https://community.dynamics.com/blogs/post/?postid=a9771594-450e-4f16-95fb-197e978e9846&utm_source=chatgpt.com "File Columns and Web API - Dynamics 365 Community"
