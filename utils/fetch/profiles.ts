import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

// Fetch individual details
export async function fetchIndividual(id: string) {
    try {
        const { data, error } = await supabase
            .from('individuals')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        return { data, error: null };
    } catch (error) {
        console.error(`Error fetching individual with ID ${id}:`, error);
        return { data: null, error };
    }
}

// Fetch driver's license
export async function fetchDriversLicense(id: string) {
    try {
        const { data, error } = await supabase
            .from('driverslicense')
            .select('*')
            .eq('individual_id', id)
            .single();

        if (error) throw error;

        return { data, error: null };
    } catch (error) {
        console.error(`Error fetching driver's license for individual with ID ${id}:`, error);
        return { data: null, error };
    }
}

// Fetch related records (addresses, emails, phone numbers, etc.)
export async function fetchRelatedRecords(id: string) {
    try {
        const [addressesData, emailsData, phoneNumbersData, criminalRecordsData, autosData, jobsData] = await Promise.all([
            supabase.from('addresses').select('*').eq('individual_id', id),
            supabase.from('emails').select('*').eq('individual_id', id),
            supabase.from('phones').select('*').eq('individual_id', id),
            supabase.from('criminal_records').select('*').eq('individual_id', id),
            supabase.from('owned_automobiles').select('*').eq('individual_id', id),
            supabase.from('jobs').select('*').eq('individual_id', id),
        ]);

        return {
            addresses: addressesData.data || [],
            emails: emailsData.data || [],
            phoneNumbers: phoneNumbersData.data || [],
            criminalRecords: criminalRecordsData.data || [],
            ownedAutos: autosData.data || [],
            jobs: jobsData.data || [],
        };
    } catch (error) {
        console.error(`Error fetching related records for individual with ID ${id}:`, error);
        return {
            addresses: [],
            emails: [],
            phoneNumbers: [],
            criminalRecords: [],
            ownedAutos: [],
            jobs: [],
            error,
        };
    }
}
