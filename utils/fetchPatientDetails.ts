// utils/fetchPatientDetails.ts
import { createClient } from './supabase/client';

const supabase = createClient();

export const fetchPatients = async () => {
    try {
        const { data, error } = await supabase.from('patientinfo').select('*');
        if (error) throw new Error(error.message);
        return data;
    } catch (error) {
        console.error('Error fetching patient data:', error.message);
        return [];
    }
};

export const fetchPatientsBarcode = async () => {
    try {
        let { data, error } = await supabase
            .from('patientinfo')
            .select(`
        patient_id,
        firstname,
        lastname,
        dob,
        height,
        weight,
        eyes,
        hair,
        address,
        city,
        state,
        zip,
        dlnumber,
        icn,
        dd,
        issuedate,
        expirydate
      `);
        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error fetching patient details:', error.message);
        return [];
    }
};
