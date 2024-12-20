// components/ProfileServer.tsx
'use server'
import { fetchAllProfiles } from '@/utils/profiles';
import { Profile } from '@/data/types/profiles';

export default async function ProfileServer(): Promise<Profile[]> {
    try {
        const { data, error } = await fetchAllProfiles();
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return [];
    }
}
