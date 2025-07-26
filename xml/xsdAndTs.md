## “DOM only” is not enough if you want type-safety

`xmldom` (or any DOM parser) only gives you the *structure* of an XML document.  
If your XML is described by an **XSD schema** you can get a lot more:

1. Compile-time TypeScript *interfaces* that mirror the schema.  
2. Run-time validation that the incoming XML actually conforms to the XSD.  

Below are the main building blocks and two complete “recipes” that give you both.

---

### 1. Tooling landscape

| Goal | Typical npm packages / tools |
|------|------------------------------|
|Validate XML against XSD (runtime)|`xsd-schema-validator`, `libxml-xsd`, `libxmljs2`|
|Generate JSON Schema from XSD|`xsd2jsonschema` (Java CLI), `xsd2json`|
|Generate TS types from JSON Schema|`quicktype`, `json-schema-to-typescript`|
|Generate TS types straight from XSD|`xsd2ts`, `xsd-codegen` (Java)|
|Parse XML ↔ JS object|`fast-xml-parser`, `xml-js`, `xml2js`|
|Bind XML ↔ class instances (decorators)|`typed-xml`, `xml-mapping`, `ta-json-x`|

No single library does *everything*, so we compose two or three.

---

## Recipe A – “XSD ➜ JSON Schema ➜ TypeScript”

Good when you already use JSON Schema elsewhere (e.g. Ajv).

1. Convert the XSD once during build time.

   ```bash
   # Java CLI (requires JDK 11+) 
   npx -y xsd2jsonschema -o schema person.xsd
   #  ➜ creates person.json (JSON-Schema draft-07)
   ```

2. Turn that JSON Schema into TypeScript.

   ```bash
   npx -y quicktype \
       --src schema/person.json \
       --lang ts \
       --out src/person.types.ts
   ```

   Generated file (excerpt):

   ```ts
   export interface Person {
     firstName: string;
     lastName:  string;
     age?:      number;
   }
   ```

3. Parse + validate + use with full type safety.

   ```ts
   import { XMLParser } from 'fast-xml-parser';
   import Ajv from 'ajv';
   import schema from './schema/person.json' assert { type: 'json' };
   import { Person } from './person.types';

   const xml = `<person><firstName>Ada</firstName><lastName>Lovelace</lastName></person>`;

   // 1️⃣  parse XML -> JS object
   const parser = new XMLParser({ ignoreAttributes: false });
   const data: Person = parser.parse(xml);

   // 2️⃣  run-time validation against the same schema
   const ajv = new Ajv();
   const valid = ajv.validate(schema, data);
   if (!valid) throw ajv.errors;

   // 3️⃣  everything henceforth is strongly typed
   console.log(data.lastName.toUpperCase());   // LOVELACE
   ```

Pros  
• Uses battle-tested JSON Schema ecosystem (Ajv etc.)  
• Works even for very large / complex schemas.  

Cons  
• Two-step generation pipeline.  
• JSON Schema loses some XSD-only constraints (xs:choice, xs:key/unique…).

---

## Recipe B – “Generate TypeScript directly from XSD”

If you prefer a single step and do **not** need JSON Schema.

(Alternatively check https://github.com/pocketbitcoin/xsd-tools)

1. Install the generator (Node-only, no Java).

   ```bash
   npm i -D xsd2ts
   npx xsd2ts person.xsd --outDir src/types
   ```

   Output (simplified):

   ```ts
   // src/types/person.xsd.d.ts
   export interface Person {
     "@id": string;            // attribute
     name:  string;
     age?:  number;
   }
   ```

2. Validate XML at run-time (optional but recommended).

   ```ts
   import { validateXML } from 'xsd-schema-validator';
   import { XMLParser }    from 'fast-xml-parser';
   import type { Person }  from './types/person.xsd';

   const xml = readFileSync('person.xml', 'utf8');

   // 1️⃣  Runtime XSD validation
   await new Promise((res, rej) =>
     validateXML(xml, 'person.xsd', err => (err ? rej(err) : res(null)))
   );

   // 2️⃣  Parse and enjoy type safety
   const person: Person = new XMLParser().parse(xml);
   console.log(person.name);
   ```

Pros  
• Single generator, no Java dependency.  
• Keeps attribute vs. element distinctions.  

Cons  
• Generator covers most, but not all, XSD constructs.  
• Still need a separate validator if you want run-time guarantees.

---

## Libraries that offer an **“XML ⇄ class decorators”** experience

If you prefer something closer to JAXB or Jackson in Java:

* `typed-xml` – annotate classes and it will (de)serialize XML, supports namespaces, text content, attributes, lists.  
* `ta-json-x` – originally JSON, but the XML plugin lets you keep the same decorators.  

These do **not** read XSD**, so you manually describe the mapping, but once written you get full TypeScript types plus convenient APIs like

```ts
@XMLRoot("person")
class Person {
  @XMLElement() firstName!: string;
  @XMLElement() lastName!: string;
}

const ada = XML.parse<Person>(xmlString);
```

---

## Summary

Yes—TypeScript can be just as type-safe around XML/XSD as Java or C#:

1. **Code-generate** the interfaces from the `.xsd` (either via JSON Schema + `quicktype`, or directly with `xsd2ts`).  
2. **Validate** incoming XML with the same XSD (`xsd-schema-validator` or `libxml-xsd`) to prevent runtime surprises.  
3. **Parse** to a plain JS object (`fast-xml-parser`) or to decorated classes (`typed-xml`).  

From that point on your IDE, compiler, and linter all treat the data exactly like any other strongly-typed TypeScript value.