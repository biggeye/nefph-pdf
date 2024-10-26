import { createClient } from '@/utils/supabase/client';
import { Profiles, Profile, Logs, DL, Banks } from '@/data/types';  // Assuming these are your data types

const supabase = createClient();

// Fetch profile data from 'seepeeen' table
export async function fetchProfile(cpn_id: string): Promise<{ data: Profile | null, error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('seepeeen')
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

// Fetch logs for a specific profile from 'logs' table
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

// Fetch driver's license data from 'dl' table
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


    // Fetch bank data from 'banks' table
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
            .from('seepeeen')
            .select('*');

        if (error) throw error;

        return { data: data as Profiles[], error: null };
    } catch (error) {
        console.error('Error fetching profiles: ', error);
        return { data: null, error: 'Error fetching profiles' };
    }
}

// Update profile data in 'seepeeen' table
export async function updateProfile(cpn_id: string, updatedFields: Partial<Profile>): Promise<{ data: Profile | null, error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('seepeeen')
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

// Update logs for a specific profile in 'logs' table
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

// Update driver's license data in 'dl' table
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

    // Update bank data in 'banks' table
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