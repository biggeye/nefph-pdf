// (/utils/createOrUpdate/individuals.ts)
import { createClient } from '@/utils/supabase/client';

// Define interfaces for individual and related data
interface IndividualData {
    id?: string; // Optional for creation, required for updates
    first_name: string;
    middle_name: string;
    last_name: string;
    date_of_birth: string;
    ssn: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    aliases: string[];
    emails: string[];
    phoneNumbers: string[];
    addresses: string[];
    criminalRecords?: any[]; // Optional
    dlForm?: any; // Optional driver's license form data
    ownedAutomobiles?: any[]; // Optional
    jobs?: any[]; // Optional
}

const supabase = createClient();

export async function createOrUpdateIndividual(individualData: IndividualData): Promise<{ success: boolean; message: string }> {
    try {
        let individualResponse, licenseResponse;
        const isUpdating = !!individualData.id;

        if (isUpdating) {
            // Update existing individual
            individualResponse = await supabase
                .from('individuals')
                .update({
                    first_name: individualData.first_name,
                    middle_name: individualData.middle_name,
                    last_name: individualData.last_name,
                    ssn: individualData.ssn,
                    date_of_birth: individualData.date_of_birth,
                    gender: individualData.gender,
                    address: individualData.address,
                    city: individualData.city,
                    state: individualData.state,
                    zip: individualData.zip,
                })
                .eq('id', individualData.id);

            if (individualResponse.error) throw individualResponse.error;

            // If driver's license info exists, update that too
            if (individualData.dlForm) {
                licenseResponse = await supabase
                    .from('driverslicense')
                    .update({
                        ...individualData.dlForm,
                    })
                    .eq('individual_id', individualData.id);

                if (licenseResponse.error) throw licenseResponse.error;
            }

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
                }])
                .select();

            if (individualResponse.error) throw individualResponse.error;

            const newIndividualId = individualResponse.data[0].id;

            // Insert related records after individual is created
            await insertRelatedRecords(newIndividualId, individualData);
        }

        return { success: true, message: isUpdating ? 'Individual updated successfully' : 'Individual created successfully' };
    } catch (error: any) {
        console.error('Error creating/updating individual:', error);
        return { success: false, message: error.message || 'An error occurred' };
    }
}

// Function to insert related records after individual creation
async function insertRelatedRecords(individualId: string, individualData: IndividualData) {
    try {
        // Insert aliases
        await Promise.all(
            individualData.aliases.filter(Boolean).map(async (alias) => {
                await supabase.from('aliases').insert([{ individual_id: individualId, alias }]);
            })
        );

        // Insert emails
        await Promise.all(
            individualData.emails.filter(Boolean).map(async (email_address) => {
                await supabase.from('emails').insert([{ individual_id: individualId, email_address }]);
            })
        );

        // Insert phone numbers
        await Promise.all(
            individualData.phoneNumbers.filter(Boolean).map(async (phone_number) => {
                await supabase.from('phones').insert([{ individual_id: individualId, phone_number }]);
            })
        );

        // Insert addresses
        await Promise.all(
            individualData.addresses.filter(Boolean).map(async (address) => {
                await supabase.from('addresses').insert([{ individual_id: individualId, address }]);
            })
        );

        // Insert criminal records, if any
        if (individualData.criminalRecords && individualData.criminalRecords.length > 0) {
            await Promise.all(
                individualData.criminalRecords.map(async (record) => {
                    await supabase.from('criminal_records').insert([{ individual_id: individualId, ...record }]);
                })
            );
        }

        // Insert driver's license, if available
        if (individualData.dlForm && individualData.dlForm.dl_number) {
            await supabase.from('driverslicense').insert([{ ...individualData.dlForm, individual_id: individualId }]);
        }

        // Insert owned automobiles, if any
        if (individualData.ownedAutomobiles && individualData.ownedAutomobiles.length > 0) {
            await Promise.all(
                individualData.ownedAutomobiles.map(async (auto) => {
                    await supabase.from('owned_automobiles').insert([{ individual_id: individualId, ...auto }]);
                })
            );
        }

        // Insert jobs, if any
        if (individualData.jobs && individualData.jobs.length > 0) {
            await Promise.all(
                individualData.jobs.map(async (job) => {
                    await supabase.from('jobs').insert([{ individual_id: individualId, ...job }]);
                })
            );
        }

        console.log('All related records inserted successfully');
    } catch (error: any) {
        console.error('Error inserting related records:', error);
        throw error; // Rethrow error so main function can handle it
    }
}
