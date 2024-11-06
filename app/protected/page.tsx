'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import { fetchAllProfiles } from '@/utils/profiles';
import { Profile } from '@/data/types/profiles';

export default function Dashboard() {
    const supabase = createClient();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [expandedProfile, setExpandedProfile] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch profiles on component mount
    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                setLoading(true);
                const { data, error } = await fetchAllProfiles();
                setProfiles(data || []);
            } catch (err) {
                console.error('Error fetching profiles:', err);
                setError('Failed to load profiles');
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    const toggleExpand = (profileId: string) => {
        setExpandedProfile(prevId => (prevId === profileId ? null : profileId));
    };

    if (loading) return <p className="text-green-400">Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4 bg-gray-800 min-h-screen">
            {/* Dashboard Header */}
            <header className="mb-6">
                <p className="text-sm text-green-400">Total Profiles: <span className="mt-1 text-2xl font-bold text-green-500">{profiles.length}</span></p>
            </header>
        </div>
    );
}
