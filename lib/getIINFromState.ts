// Import the JSON files without 'assert { type: 'json' }'
import { IINData } from '@/types';

// Import the JSON data
import iinData from '@/data/iin.json'; // This will be treated as IINData automatically

// Optionally assert the type of the imported data


import statesData from '@/data/states.json';


const iinDataTyped: IINData = iinData;
// Function to get IIN from the state abbreviation
export function getIINFromState(stateAbbreviation: string): string | undefined {
    return iinDataTyped[stateAbbreviation.toUpperCase()]; // Ensure case consistency
}
