import { createClient } from '@/utils/supabase/client';
const supabase = createClient();

export async function insertPatient(patientData) {


    const { data, error } = await supabase
        .from('patientinfo')
        .insert([patientData]); // patientData is an object containing the patient details.

    if (error) {
        console.error("Error inserting patient:", error);
        throw error;
    }

    return data;
}

export async function insertFacility(facilityData) {
    const { data, error } = await supabase
        .from('facilities')
        .insert([facilityData]); // facilityData is an object with facility details.

    if (error) {
        console.error("Error inserting facility:", error);
        throw error;
    }

    return data;
}

export async function insertPlacement(placementData) {
    const { data, error } = await supabase
        .from('placements')
        .insert([placementData]); // placementData contains patient_id, facility_id, start_date, and end_date.

    if (error) {
        console.error("Error inserting placement:", error);
        throw error;
    }

    return data;
}


