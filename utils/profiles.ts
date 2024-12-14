import { createClient } from '@/utils/supabase/client';
import { Business, Profile, Logs, DL, Banks } from '@/data/types/profiles';  // Assuming these are your data types

const supabase = createClient();

export async function fetchBusiness(cpn_id: string): Promise<{ data: Business | null, error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('business')
            .select('*')
            .eq('cpn_id', cpn_id)
            .maybeSingle();

        if (error) throw error;
        return { data: data as Business, error: null };
    } catch (error) {
        console.error('Error fetching business: ', error);
        return { data: null, error: 'Error fetching business' };
    }
}

export async function fetchProfile(cpn_id: string): Promise<{ data: Profile | null, error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('profile')
            .select('*')
            .eq('cpn_id', cpn_id)
            .single();  // Fetch a single profile

        if (error) throw error;

        return { data: data as Profile, error: null };
    } catch (error) {
        console.error('Error fetching profile:', error);
        return { data: null, error: 'Error fetching profile' };
    }
}

export async function fetchLogs(cpn_id: string): Promise<{ data: Logs[] | null, error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('logs')
            .select('*')
            .eq('cpn_id', cpn_id);

        if (error) throw error;

        return { data: data as Logs[], error: null };
    } catch (error) {
        console.error('Error fetching logs:', error);
        return { data: null, error: 'Error fetching logs' };
    }
}

export async function fetchDL(cpn_id: string): Promise<{ data: any | null, error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('dl')
            .select('*')
            .eq('cpn_id', cpn_id)
            .maybeSingle();  // Use maybeSingle instead of single()

        if (error) throw error;

        return { data, error: null };
    } catch (error) {
        console.error('Error fetching drivers license:', error);
        return { data: null, error: 'Error fetching drivers license' };
    }
}

    export async function fetchBanks(cpn_id: string): Promise<{ data: Banks[] | null, error: string | null }> {
        try {
            const { data, error } = await supabase
                .from('banks')
                .select('*')
                .eq('cpn_id', cpn_id);

            if (error) throw error;

            return { data: data as Banks[], error: null };
        } catch (error) {
            console.error('Error fetching banks:', error);
            return { data: null, error: 'Error fetching banks' };
        }
    }
export async function fetchAllProfiles() {
    try {
        const { data, error } = await supabase
            .from('profile')
            .select('*');

        if (error) throw error;

        return { data: data as Profiles[], error: null };
    } catch (error) {
        console.error('Error fetching profiles: ', error);
        return { data: null, error: 'Error fetching profiles' };
    }
}

// UPDATE
export async function updateProfile(cpn_id: string, updatedFields: Partial<Profile>): Promise<{ data: Profile | null, error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('profile')
            .update(updatedFields)
            .eq('cpn_id', cpn_id)
            .single();  // Update a single profile

        if (error) throw error;

        return { data: data as Profile, error: null };
    } catch (error) {
        console.error('Error updating profile:', error);
        return { data: null, error: 'Error updating profile' };
    }
}

export async function updateLogs(cpn_id: string, logId: string, updatedFields: Partial<Logs>): Promise<{ data: Logs | null, error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('logs')
            .update(updatedFields)
            .eq('cpn_id', cpn_id)
            .eq('log_id', logId)
            .single();  // Update a specific log entry

        if (error) throw error;

        return { data: data as Logs, error: null };
    } catch (error) {
        console.error('Error updating logs:', error);
        return { data: null, error: 'Error updating logs' };
    }
}


export async function updateDL(cpn_id: string, updatedFields: Partial<DL>): Promise<{ data: DL | null, error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('dl')
            .update(updatedFields)
            .eq('cpn_id', cpn_id)
            .single();  // Update a specific driver's license record

        if (error) throw error;

        return { data: data as DL, error: null };
    } catch (error) {
        console.error('Error updating drivers license: ', error);
        return {
            data: null, error: 'Error updating drivers license' };
    }
    }

    export async function updateBanks(cpn_id: string, bankId: string, updatedFields: Partial<Banks>): Promise<{ data: Banks | null, error: string | null }> {
        try {
            const { data, error } = await supabase
                .from('banks')
                .update(updatedFields)
                .eq('cpn_id', cpn_id)
                .eq('bank_id', bankId)
                .single();  // Update a specific bank entry

            if (error) throw error;

            return { data: data as Banks, error: null };
        } catch (error) {
            console.error('Error updating bank information:', error);
            return { data: null, error: 'Error updating bank information' };
        }
}

export async function updateBusiness(id: string, updatedFields: Partial<Business>): Promise<{ data: Business | null, error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('business')
            .update(updatedFields)
            .eq('id', id)
            .single();  // Update a specific row by ID

        if (error) throw error;

        return { data: data as Business, error: null };
    } catch (error) {
        console.error('Error updating business:', error);
        return { data: null, error: 'Error updating business' };
    }
}

// CREATE

export async function createBusiness(newEntry: Business): Promise<{ data: Business | null, error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('business')
            .insert(newEntry)
            .single();  // Insert a single new entry

        if (error) throw error;

        return { data: data as Business, error: null };
    } catch (error) {
        console.error('Error creating business row:', error);
        return { data: null, error: 'Error creating business row' };
    }
}

export async function createLog(newEntry: Logs): Promise<{ data: Logs | null, error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('log')
            .insert(newEntry)
            .single();  // Insert a single new entry

        if (error) throw error;

        return { data: data as Logs, error: null };
    } catch (error) {
        console.error('Error creating business row:', error);
        return { data: null, error: 'Error creating business row' };
    }
}

export async function createDL(newEntry: DL): Promise<{ data: DL | null, error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('dl')
            .insert(newEntry)
            .single();  // Insert a single new entry

        if (error) throw error;

        return { data: data as DL, error: null };
    } catch (error) {
        console.error('Error creating business row:', error);
        return { data: null, error: 'Error creating business row' };
    }
}

export async function createBank(newEntry: Banks): Promise<{ data: Banks | null, error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('banks')
            .insert(newEntry)
            .single();  // Insert a single new entry

        if (error) throw error;

        return { data: data as Banks, error: null };
    } catch (error) {
        console.error('Error creating business row:', error);
        return { data: null, error: 'Error creating business row' };
    }
}

// /utils/profiles.ts


export async function createProfile(newEntry: Partial<Profile>): Promise<{ data: Profile | null; error: any }> {
    try {
        console.log("Sending profile to Supabase: ", newEntry);
        const { data, error } = await supabase
            .from('profile')
            .insert(newEntry)
            .select() // Add .select() to retrieve the inserted data
            .single();

        if (error) {
            console.error('Supabase error during profile creation:', error);
            return { data: null, error };
        }

        if (!data) {
            console.error('No data returned after profile creation.');
            return { data: null, error: new Error('No data returned after profile creation.') };
        }

        return { data: data as Profile, error: null };
    } catch (error) {
        console.error('Error creating profile in createProfile function:', error);
        return { data: null, error };
    }
}
