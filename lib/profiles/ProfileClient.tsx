'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Profile } from '@/data/types/profiles';

type ProfilesClientProps = {
    profiles: Profile[];
};

type SortConfig = {
    key: keyof Profile;
    direction: 'asc' | 'desc';
};

export default function ProfilesClient({ profiles: initialProfiles }: ProfilesClientProps) {
    const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
    const [isListView, setIsListView] = useState<boolean>(false);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'first_name', direction: 'asc' });

    const sortProfiles = (key: keyof Profile) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        setProfiles((prevProfiles) => {
            return [...prevProfiles].sort((a, b) => {
                const valA = a[key] as string | number;
                const valB = b[key] as string | number;

                if (valA < valB) return direction === 'asc' ? -1 : 1;
                if (valA > valB) return direction === 'asc' ? 1 : -1;
                return 0;
            });
        });
    };

    return (
        <>
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
                                    {/* Add other columns here */}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800 bg-gray-900">
                                {profiles.map((profile) => (
                                    <tr key={profile.cpn_id}>
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
                                        {/* Add other fields here */}
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
                                    </div>
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
        </>
    );
}
