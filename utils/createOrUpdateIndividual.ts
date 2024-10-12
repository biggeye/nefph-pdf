import { createClient } from '@/utils/supabase/client'; // Supabase client instance

// Interface for the individual and driver's license data
interface IndividualData {
    id?: string; // Optional for creation, required for updates
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    classification: string;
    restrictions: string;
    endorsements: string;
    hair_color: string;
    eye_color: string;
    height: string;
    weight: string;
    dd: string;
    icn: string;
    issue_date: string;
    expiration_date: string;
    picture_url: string;
}

const supabase = createClient();

export async function createOrUpdateIndividual(individualData: IndividualData): Promise<{ success: boolean; message: string }> {
    try {
        let individualResponse, licenseResponse;

        // Update if individual ID exists, otherwise insert a new individual
        if (individualData.id) {
            individualResponse = await supabase
                .from('individuals')
                .update({
                    first_name: individualData.first_name,
                    last_name: individualData.last_name,
                    date_of_birth: individualData.date_of_birth,
                    gender: individualData.gender,
                    address: individualData.address,
                    city: individualData.city,
                    state: individualData.state,
                    zip: individualData.zip,
                })
                .eq('id', individualData.id);

            if (individualResponse.error) throw individualResponse.error;

            // Update driver's license for the individual
            licenseResponse = await supabase
                .from('driverslicense')
                .update({
                    classification: individualData.classification,
                    restrictions: individualData.restrictions,
                    endorsements: individualData.endorsements,
                    hair_color: individualData.hair_color,
                    eye_color: individualData.eye_color,
                    height: individualData.height,
                    weight: individualData.weight,
                    dd: individualData.dd,
                    icn: individualData.icn,
                    issue_date: individualData.issue_date,
                    expiration_date: individualData.expiration_date,
                    picture_url: individualData.picture_url,
                })
                .eq('individual_id', individualData.id); // Use individual_id for linking to the individual's driver's license

            if (licenseResponse.error) throw licenseResponse.error;

            return { success: true, message: 'Individual and driver’s license updated successfully' };
        } else {
            // Insert new individual
            individualResponse = await supabase
                .from('individuals')
                .insert([{
                    first_name: individualData.first_name,
                    last_name: individualData.last_name,
                    date_of_birth: individualData.date_of_birth,
                    gender: individualData.gender,
                    address: individualData.address,
                    city: individualData.city,
                    state: individualData.state,
                    zip: individualData.zip,
                }]);

            if (individualResponse.error) throw individualResponse.error;

            const newIndividualId = individualResponse.data[0].id;

            // Insert new driver's license for the individual
            licenseResponse = await supabase
                .from('driverslicense')
                .insert([{
                    individual_id: newIndividualId, // Reference the new individual
                    classification: individualData.classification,
                    restrictions: individualData.restrictions,
                    endorsements: individualData.endorsements,
                    hair_color: individualData.hair_color,
                    eye_color: individualData.eye_color,
                    height: individualData.height,
                    weight: individualData.weight,
                    dd: individualData.dd,
                    icn: individualData.icn,
                    issue_date: individualData.issue_date,
                    expiration_date: individualData.expiration_date,
                    picture_url: individualData.picture_url,
                }]);

            if (licenseResponse.error) throw licenseResponse.error;

            return { success: true, message: 'Individual and driver’s license created successfully' };
        }
    } catch (error: any) {
        console.error('Error creating/updating individual and driver’s license:', error);
        return { success: false, message: error.message || 'An error occurred' };
    }
}
