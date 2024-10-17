import { createClient } from '@/utils/supabase/client';
const supabase = createClient();

export async function fetchPlacements() {
    const { data, error } = await supabase
        .from('placements')
        .select(`*
        `)
        .is('end', null)  // Fetch placements where the end date is null (ongoing)
        .order('beginning', { ascending: true });

    if (error) {
        console.error("Error fetching current placements:", error);
        throw error;
    }
    return data;
}

export async function fetchPastPlacements() {
    const { data, error } = await supabase
        .from('placements')
        .select(`patient_firstname, patient_lastname
        `)
        .not('end', 'is', null)  // Fetch placements where the end date is not null (completed)
        .order('beginning', { ascending: false });

    if (error) {
        console.error("Error fetching historical placements:", error);
        throw error;
    }
    return data;
}

export async function fetchPatientsInCurrentPlacements() {
    const { data, error } = await supabase
        .from('placements')
        .select('patient_firstname, patient_lastname')
        .is('end', null)  // Only fetch ongoing placements
        .order('patient_lastname', { ascending: true });

    if (error) {
        console.error("Error fetching patients in current placements:", error);
        throw error;
    }
    return data;
}
