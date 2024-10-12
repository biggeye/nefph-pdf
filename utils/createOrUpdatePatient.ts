// /utils/createOrUpdatePatient.ts

import { createClient } from '@/utils/supabase/client'; // Make sure this is your Supabase client instance

// Interface for the patient data
interface PatientData {
    id?: string; // Optional for creation, required for updates
    firstName: string;
    lastName: string;
    state: string;
    insuranceProvider: string;
    // Include any other fields you need based on your DB schema
}

const supabase = createClient();

export async function createOrUpdatePatient(patientData: PatientData): Promise<{ success: boolean; message: string }> {
    try {
        if (patientData.id) {
            // If an ID exists, update the existing patient record
            const { data, error } = await supabase
                .from('patients') // Replace 'patients' with the actual name of your table
                .update({
                    firstName: patientData.firstName,
                    lastName: patientData.lastName,
                    state: patientData.state,
                    insuranceProvider: patientData.insuranceProvider,
                    // Add more fields as required by your database schema
                })
                .eq('id', patientData.id); // Update where the 'id' matches

            if (error) throw error;

            return { success: true, message: 'Patient updated successfully' };
        } else {
            // No ID means we are creating a new record
            const { data, error } = await supabase
                .from('patients') // Replace 'patients' with the actual name of your table
                .insert([
                    {
                        firstName: patientData.firstName,
                        lastName: patientData.lastName,
                        state: patientData.state,
                        insuranceProvider: patientData.insuranceProvider,
                        // Add more fields as required by your database schema
                    },
                ]);

            if (error) throw error;

            return { success: true, message: 'Patient created successfully' };
        }
    } catch (error: any) {
        console.error('Error creating/updating patient:', error);
        return { success: false, message: error.message || 'An error occurred' };
    }
}
