import { ODataToTsConverter } from '../ODataToTsConverter';

describe('ODataToTsConverter', () => {
  let converter: ODataToTsConverter;

  beforeEach(() => {
    converter = new ODataToTsConverter();
  });

  test('should convert TripPin metadata to TypeScript', async () => {
    const result = await converter.convertFromUrl('https://services.odata.org/v4/TripPinServiceRW/$metadata');

    // Check that enums are generated
    expect(result).toContain('export enum PersonGender');
    expect(result).toContain('Male = 0');
    expect(result).toContain('Female = 1');

    // Check that interfaces are generated
    expect(result).toContain('export interface Person');
    expect(result).toContain('export interface Trip');
    expect(result).toContain('export interface Location');

    // Check inheritance
    expect(result).toContain('export interface Flight extends PublicTransportation');
    expect(result).toContain('export interface EventLocation extends Location');

    // Check navigation properties
    expect(result).toContain('Friends?: Person[]');
    expect(result).toContain('Trips?: Trip[]');

    // Check type mappings
    expect(result).toContain('UserName: string');
    expect(result).toContain('TripId: number');
    expect(result).toContain('Gender?: PersonGender');
    expect(result).toContain('StartsAt: Date');
  });

  test('should handle collections properly', async () => {
    const result = await converter.convertFromUrl('https://services.odata.org/v4/TripPinServiceRW/$metadata');

    expect(result).toContain('Emails?: string[]');
    expect(result).toContain('Tags: string[]');
    expect(result).toContain('Photos?: Photo[]');
  });

  test('should handle complex types', async () => {
    const result = await converter.convertFromUrl('https://services.odata.org/v4/TripPinServiceRW/$metadata');

    expect(result).toContain('AddressInfo?: Location[]');
    expect(result).toContain('City: City');
    expect(result).toContain('Location: AirportLocation');
  });

  test('should handle nullable properties', async () => {
    const result = await converter.convertFromUrl('https://services.odata.org/v4/TripPinServiceRW/$metadata');

    // Required properties (no question mark)
    expect(result).toContain('UserName: string');
    expect(result).toContain('Name: string');

    // Optional properties (with question mark)
    expect(result).toContain('Name?: string');
    expect(result).toContain('Description?: string');
  });

  test('should throw error for unsupported OData versions', async () => {
    await expect(converter.convertFromUrl('https://services.odata.org/northwind/northwind.svc/$metadata')).rejects.toThrow(
      'Unsupported OData version: 1.0. Only OData v4.0 metadata is supported. Please upgrade your OData service to v4.0 or use a different converter for older versions.'
    );
  });

  test('should throw error for invalid metadata', async () => {
    const invalidXml = '<?xml version="1.0"?><invalid>test</invalid>';
    
    expect(() => converter.convertFromXml(invalidXml)).toThrow(
      'Invalid OData metadata: Missing edmx:Edmx root element'
    );
  });
});
