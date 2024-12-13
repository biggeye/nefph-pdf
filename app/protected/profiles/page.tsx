'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import { fetchAllProfiles } from '@/utils/profiles';
import { Profile } from '@/data/types/profiles';

type SortConfig = {
    key: keyof Profile;
    direction: 'asc' | 'desc';
};

export default function Profiles() {
    const supabase = createClient();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [expandedProfile, setExpandedProfile] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isListView, setIsListView] = useState<boolean>(false);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'first_name', direction: 'asc' });


    useEffect(() => {
        async function fetchProfiles() {
            try {
                setLoading(true);
                const { data, error } = await fetchAllProfiles();
                if (error) throw error;
                setProfiles(data || []); // Ensure data is not null
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

    const sortProfiles = (key: keyof Profile) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        setProfiles((prevProfiles) => {
            if (!prevProfiles) return []; // Handle undefined or null profiles
            return [...prevProfiles]
                .filter((profile) => profile && profile[key] !== undefined) // Filter out invalid profiles
                .sort((a, b) => {
                    const valA = a[key] as string | number; // Type assertion
                    const valB = b[key] as string | number;

                    if (valA < valB) return direction === 'asc' ? -1 : 1;
                    if (valA > valB) return direction === 'asc' ? 1 : -1;
                    return 0;
                });
        });
    };

    if (loading) return <p className="text-green-400">Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4 bg-gray-800 min-h-screen">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <button
                        type="button"
                        onClick={() => setIsListView(!isListView)}
                        className="rounded-full bg-indigo-600 p-2 text-center text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                        {isListView ? '🔲' : '📋'}
                    </button>
                    <Link href="./profiles/create">
                        <button
                            type="button"
                            className="rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-green-500"
                        >
                            Create Profile
                        </button>
                    </Link>
                </div>
            </div>

            {isListView ? (
                <div className="mt-8 flow-root">
                    <div className="inline-block min-w-full py-1 align-middle sm:px-3 lg:px-4">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead>
                                <tr>
                                    <th
                                        onClick={() => sortProfiles('first_name')}
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 cursor-pointer sm:pl-0"
                                    >
                                        Name
                                    </th>
                                    <th
                                        onClick={() => sortProfiles('address')}
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300 cursor-pointer"
                                    >
                                        Address
                                    </th>
                                    <th
                                        onClick={() => sortProfiles('state')}
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300 cursor-pointer"
                                    >
                                        State
                                    </th>
                                    <th
                                        onClick={() => sortProfiles('ssn')}
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300 cursor-pointer"
                                    >
                                        SSN
                                    </th>
                                    <th
                                        onClick={() => sortProfiles('dob')}
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300 cursor-pointer"
                                    >
                                        DoB
                                    </th>
                                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">View</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800 bg-gray-900">
                                {profiles.map((profile) => (
                                    <tr key={profile?.cpn_id || 'unknown'}>
                                        <td className="whitespace-nowrap py-2 pl-4 text-sm sm:pl-0">
                                            <div className="flex items-center">
                                                <img
                                                    alt="Avatar"
                                                    src={profile.picture_url || 'https://via.placeholder.com/48?text=Avatar'}
                                                    className="h-11 w-11 rounded-full"
                                                />
                                                <div className="ml-4">
                                                    <div className="font-medium text-gray-300">{profile.first_name} {profile.last_name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{profile?.address || 'N/A'}</td>
                                        <td>{profile?.state || 'N/A'}</td>
                                        <td>{profile?.ssn || 'N/A'}</td>
                                        <td>{profile?.dob || 'N/A'}</td>
                                        <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <Link href={`/protected/profiles/${profile.cpn_id}`}>
                                                <h3 className="cursor-pointer truncate text-sm font-bold text-green-500 hover:text-white">
                                                    {profile.first_name} {profile.last_name}
                                                </h3>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                    {profiles.map((profile) => (
                        <li key={profile.cpn_id} className="col-span-1 divide-y divide-green-900 rounded-lg bg-gray-900 shadow-lg">
                            <div className="flex w-full items-center justify-between space-x-6 p-6 text-green-400">
                                <div className="flex-1 truncate">
                                    <div className="flex items-center space-x-3">
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
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
