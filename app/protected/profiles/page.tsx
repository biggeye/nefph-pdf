'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Next.js Link for navigation
import { createClient } from '@/utils/supabase/client';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import { fetchAllProfiles } from '@/utils/profiles';
import { Profile } from '@/data/types';

export default function Dashboard() {
    const supabase = createClient();
    const [profiles, setProfiles] = useState<Profile[]>([]); // Use Profile array type
    const [expandedProfile, setExpandedProfile] = useState<string | null>(null); // Track the expanded profile
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProfiles() {
            try {
                setLoading(true);
                const { data, error } = await fetchAllProfiles(); // Fetch from 'seepeeen' table
                if (error) throw error;
                setProfiles(data);
            } catch (error) {
                console.error('Error fetching profiles:', error);
                setError('Failed to load profiles');
            } finally {
                setLoading(false);
            }
        }

        fetchProfiles();
    }, []);

    const toggleExpand = (profileId: string) => {
        setExpandedProfile(expandedProfile === profileId ? null : profileId);
    };

    if (loading) return <p className="text-green-400">Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4 bg-gray-800 min-h-screen">
            {/* Dashboard Header Section */}
            <header className="mb-6">
                {/* Stats Overview */}
                        <p className="text-sm text-green-400">Total Profiles:  </p><span className="mt-1 text-2xl font-bold text-green-500">{profiles.length}</span>
            </header>

            {/* Profile List */}
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {profiles.map((profile) => (
                    <li key={profile.cpn_id} className="col-span-1 divide-y divide-green-900 rounded-lg bg-gray-900 shadow-lg">
                        <div className="flex w-full items-center justify-between space-x-6 p-6 text-green-400">
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    {/* Use Next.js Link for navigation */}
                                    <Link href={`/protected/profiles/${profile.cpn_id}`} passHref>
                                        <h3 className="cursor-pointer truncate text-sm font-bold text-green-500 hover:text-white">
                                            {profile.first_name} {profile.last_name}
                                        </h3>
                                    </Link>
                                    <span className="inline-flex items-center rounded-full bg-green-900 px-1.5 py-0.5 text-xs font-medium text-green-400 ring-1 ring-green-500/20">
                                        {profile.role || 'User'}
                                    </span>
                                </div>
                                <p className="mt-1 truncate text-sm text-green-500">SSN: {profile.ssn}</p>
                                <p className="mt-1 truncate text-sm text-green-500">DOB: {profile.dob}</p>
                                <p className="mt-1 truncate text-sm text-green-500">{profile.email || 'No email available'}</p>
                                <p className="mt-1 truncate text-sm text-green-500">{profile.phone || 'No phone available'}</p>
                            </div>
                            <img
                                alt="Avatar"
                                src={profile.picture_url || 'https://via.placeholder.com/48?text=Avatar'}
                                className="h-10 w-10 flex-shrink-0 rounded-full bg-green-900"
                            />
                        </div>

                        <div className="-mt-px flex divide-x divide-green-900">
                            <div className="flex w-0 flex-1">
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-green-500"
                                >
                                    <EnvelopeIcon aria-hidden="true" className="h-5 w-5 text-green-400" />
                                    Email
                                </a>
                            </div>
                            <div className="-ml-px flex w-0 flex-1">
                                <a
                                    href={`tel:${profile.phone}`}
                                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-green-500"
                                >
                                    <PhoneIcon aria-hidden="true" className="h-5 w-5 text-green-400" />
                                    Call
                                </a>
                            </div>
                        </div>

                        {/* Expanded Profile Details */}
                        <button
                            onClick={() => toggleExpand(profile.cpn_id)}
                            className="w-full text-sm font-semibold text-green-500 hover:text-white py-2"
                        >
                            {expandedProfile === profile.cpn_id ? 'Hide Details' : 'View Details'}
                        </button>

                        {expandedProfile === profile.cpn_id && (
                            <div className="bg-gray-800 p-4 mt-2 rounded-md text-green-400">
                                <p>Address: {profile.address}</p>
                                <p>City: {profile.city}</p>
                                <p>State: {profile.state}</p>
                                <p>ZIP: {profile.zip}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
