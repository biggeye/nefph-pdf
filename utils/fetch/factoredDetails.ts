import { createClient } from '@/utils/supabase/client';

// Initialize the Supabase client
const supabase = createClient();

export const fetchFactors = async (selectedState) => {
    try {
        console.log("Selected State: ", selectedState);

        // Fetch the count of insurance policies grouped by provider
        const { data: insuranceByProvider, error: providerError } = await supabase
            .from('patientinfo')
            .select('insurance, count(*)')
            .group('insurance');

        console.log("Provider query completed. Data:", insuranceByProvider, "Error:", providerError);

        if (providerError) throw new Error(providerError.message);

        // Fetch the count of insurance policies grouped by state
        const { data: insuranceByState, error: stateError } = await supabase
            .from('patientinfo')
            .select('state, count(*)')
            .group('state');

        console.log("State query completed. Data:", insuranceByState, "Error:", stateError);

        if (stateError) throw new Error(stateError.message);

        // Return both sets of statistics
        console.log("Final Result - insuranceByProvider:", insuranceByProvider);
        console.log("Final Result - insuranceByState:", insuranceByState);

        return {
            insuranceByProvider,
            insuranceByState,
        };

    } catch (error) {
        console.error('Error fetching factors:', error.message);
        return { insuranceByProvider: [], insuranceByState: [] };
    }
};
