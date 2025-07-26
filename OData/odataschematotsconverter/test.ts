import { ODataToTsConverter } from './ODataToTsConverter';

async function test() {
  const converter = new ODataToTsConverter();

  try {
    console.log('Converting TripPin metadata to TypeScript...');
    const result = await converter.convertFromUrl('https://services.odata.org/v4/TripPinServiceRW/$metadata');

    console.log('Generated TypeScript interfaces:');
    console.log('='.repeat(50));
    console.log(result);

    // Save to file
    const fs = await import('fs');
    fs.writeFileSync('generated-types.ts', result);
    console.log('\nSaved to generated-types.ts');

  } catch (error) {
    console.error('Error converting metadata:', error);
  }
}

test();
