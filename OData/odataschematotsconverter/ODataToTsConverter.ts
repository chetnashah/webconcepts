import { Project, SourceFile, InterfaceDeclaration, EnumDeclaration } from 'ts-morph';
import { XMLParser } from 'fast-xml-parser';

interface ODataType {
  namespace: string;
  name: string;
  properties: ODataProperty[];
  baseType?: string;
  isEntity: boolean;
}

interface ODataProperty {
  name: string;
  type: string;
  nullable: boolean;
  isCollection: boolean;
  isNavigation: boolean;
}

interface ODataEnum {
  namespace: string;
  name: string;
  members: { name: string; value: number }[];
}

class ODataToTsConverter {
  private project: Project;
  private sourceFile: SourceFile;
  private xmlParser: XMLParser;

  constructor() {
    this.project = new Project();
    this.sourceFile = this.project.createSourceFile(`generated-types-${Date.now()}.ts`);
    this.xmlParser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text'
    });
  }

  async convertFromUrl(metadataUrl: string): Promise<string> {
    const response = await fetch(metadataUrl);
    const xmlContent = await response.text();
    return this.convertFromXml(xmlContent);
  }

  convertFromXml(xmlContent: string): string {
    const parsedXml = this.xmlParser.parse(xmlContent);
    
    // Check OData version
    this.validateODataVersion(parsedXml);

    // Extract schema data
    const schema = this.extractSchema(parsedXml);

    // Generate TypeScript types
    this.generateEnums(schema.enums);
    this.generateInterfaces(schema.types);

    return this.sourceFile.getFullText();
  }

  private validateODataVersion(parsedXml: any): void {
    const edmx = parsedXml['edmx:Edmx'];
    if (!edmx) {
      throw new Error('Invalid OData metadata: Missing edmx:Edmx root element');
    }

    const version = edmx['@_Version'];
    if (!version) {
      throw new Error('Invalid OData metadata: Missing Version attribute');
    }

    if (version !== '4.0') {
      throw new Error(`Unsupported OData version: ${version}. Only OData v4.0 metadata is supported. Please upgrade your OData service to v4.0 or use a different converter for older versions.`);
    }
  }

  private extractSchema(parsedXml: any) {
    const edmx = parsedXml['edmx:Edmx'];
    const dataServices = edmx['edmx:DataServices'];
    const schema = dataServices.Schema;

    const types: ODataType[] = [];
    const enums: ODataEnum[] = [];

    // Extract namespace
    const namespace = schema['@_Namespace'];

    // Extract EnumTypes
    if (schema.EnumType) {
      const enumTypes = Array.isArray(schema.EnumType) ? schema.EnumType : [schema.EnumType];
      for (const enumType of enumTypes) {
        const members = Array.isArray(enumType.Member) ? enumType.Member : [enumType.Member];
        enums.push({
          namespace,
          name: enumType['@_Name'],
          members: members.map((member: any) => ({
            name: member['@_Name'],
            value: parseInt(member['@_Value'] || '0')
          }))
        });
      }
    }

    // Extract EntityTypes
    if (schema.EntityType) {
      const entityTypes = Array.isArray(schema.EntityType) ? schema.EntityType : [schema.EntityType];
      for (const entityType of entityTypes) {
        types.push(this.extractType(entityType, namespace, true));
      }
    }

    // Extract ComplexTypes
    if (schema.ComplexType) {
      const complexTypes = Array.isArray(schema.ComplexType) ? schema.ComplexType : [schema.ComplexType];
      for (const complexType of complexTypes) {
        types.push(this.extractType(complexType, namespace, false));
      }
    }

    return { types, enums };
  }

  private extractType(typeDefinition: any, namespace: string, isEntity: boolean): ODataType {
    const properties: ODataProperty[] = [];

    // Extract regular properties
    if (typeDefinition.Property) {
      const props = Array.isArray(typeDefinition.Property) ? typeDefinition.Property : [typeDefinition.Property];
      for (const prop of props) {
        properties.push({
          name: prop['@_Name'],
          type: prop['@_Type'],
          nullable: prop['@_Nullable'] !== 'false',
          isCollection: prop['@_Type'].startsWith('Collection('),
          isNavigation: false
        });
      }
    }

    // Extract navigation properties
    if (typeDefinition.NavigationProperty) {
      const navProps = Array.isArray(typeDefinition.NavigationProperty) ? typeDefinition.NavigationProperty : [typeDefinition.NavigationProperty];
      for (const navProp of navProps) {
        properties.push({
          name: navProp['@_Name'],
          type: navProp['@_Type'],
          nullable: navProp['@_Nullable'] !== 'false',
          isCollection: navProp['@_Type'].startsWith('Collection('),
          isNavigation: true
        });
      }
    }

    return {
      namespace,
      name: typeDefinition['@_Name'],
      properties,
      baseType: typeDefinition['@_BaseType'],
      isEntity
    };
  }

  private generateEnums(enums: ODataEnum[]) {
    for (const enumType of enums) {
      const enumDecl = this.sourceFile.addEnum({
        name: enumType.name,
        isExported: true
      });

      for (const member of enumType.members) {
        enumDecl.addMember({
          name: member.name,
          value: member.value
        });
      }
    }
  }

  private generateInterfaces(types: ODataType[]) {
    // Sort types to handle inheritance properly (base types first)
    const sortedTypes = this.sortTypesByInheritance(types);

    for (const type of sortedTypes) {
      const interfaceDecl = this.sourceFile.addInterface({
        name: type.name,
        isExported: true
      });

      // Handle inheritance
      if (type.baseType) {
        const baseTypeName = this.extractTypeNameFromFullType(type.baseType);
        interfaceDecl.addExtends(baseTypeName);
      }

      // Add properties
      for (const prop of type.properties) {
        let propType = this.mapODataTypeToTs(prop.type);

        // Handle collections
        if (prop.isCollection) {
          const elementType = prop.type.match(/Collection\((.+)\)/)?.[1] || 'any';
          propType = `${this.mapODataTypeToTs(elementType)}[]`;
        }

        // Already handled in mapODataTypeToTs

        interfaceDecl.addProperty({
          name: prop.name,
          type: propType,
          hasQuestionToken: prop.nullable
        });
      }
    }
  }

  private sortTypesByInheritance(types: ODataType[]): ODataType[] {
    const sorted: ODataType[] = [];
    const processed = new Set<string>();

    const processType = (type: ODataType) => {
      if (processed.has(type.name)) return;

      // Process base type first if it exists
      if (type.baseType) {
        const baseTypeName = this.extractTypeNameFromFullType(type.baseType);
        const baseType = types.find(t => t.name === baseTypeName);
        if (baseType) {
          processType(baseType);
        }
      }

      sorted.push(type);
      processed.add(type.name);
    };

    for (const type of types) {
      processType(type);
    }

    return sorted;
  }

  private extractTypeNameFromFullType(fullType: string): string {
    // Extract type name from fully qualified type (e.g., "Microsoft.OData.SampleService.Models.TripPin.Person" -> "Person")
    const parts = fullType.split('.');
    return parts[parts.length - 1];
  }

  private mapODataTypeToTs(odataType: string): string {
    const typeMap: Record<string, string> = {
      'Edm.String': 'string',
      'Edm.Int32': 'number',
      'Edm.Int64': 'number',
      'Edm.Int16': 'number',
      'Edm.Byte': 'number',
      'Edm.SByte': 'number',
      'Edm.Double': 'number',
      'Edm.Single': 'number',
      'Edm.Decimal': 'number',
      'Edm.Boolean': 'boolean',
      'Edm.DateTimeOffset': 'Date',
      'Edm.DateTime': 'Date',
      'Edm.Date': 'Date',
      'Edm.TimeOfDay': 'string',
      'Edm.Guid': 'string',
      'Edm.Duration': 'string',
      'Edm.Binary': 'Uint8Array',
      'Edm.Stream': 'Blob',
      'Edm.GeographyPoint': '{ latitude: number; longitude: number }',
      'Edm.Geography': 'any',
      'Edm.GeometryPoint': '{ x: number; y: number }',
      'Edm.Geometry': 'any'
    };

    // Handle primitive types
    if (typeMap[odataType]) {
      return typeMap[odataType];
    }

    // Handle fully qualified custom types
    if (odataType.includes('.')) {
      return this.extractTypeNameFromFullType(odataType);
    }

    return odataType;
  }
}

export { ODataToTsConverter };
