'use client';

import {
    AcademicCapIcon,
    QrCodeIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

const actions = [
    {
        title: 'Manage Profiles',
        href: '/protected/profiles', // Link to profiles section
        icon: UsersIcon,
        iconForeground: 'text-purple-700',
        iconBackground: 'bg-purple-50',
    },
    {
        title: 'Barcode Scanning',
        href: '/protected/barcode', // Link to barcode scanning section
        icon: QrCodeIcon, // Example icon
        iconForeground: 'text-teal-700',
        iconBackground: 'bg-teal-50',
    },
    {
        title: 'Training',
        href: '#',
        icon: AcademicCapIcon,
        iconForeground: 'text-indigo-700',
        iconBackground: 'bg-indigo-50',
    },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Dashboard() {
    const supabase = createClient();
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProfiles() {
            try {
                setLoading(true);
                const { data, error } = await supabase.from('seepeeen').select('*');
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4">
            {/* Dashboard Header */}
            <header className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">seePeeEnz Dashboard</h1>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Profiles</p>
                        <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{profiles.length}</p>
                    </div>
                </div>
            </header>

            {/* Action Card Grid */}
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
                {actions.map((action, actionIdx) => (
                    <div
                        key={action.title}
                        className={classNames(
                            actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                            actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                            actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                            actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                            'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500',
                        )}
                    >
                        <div>
                            <span
                                className={classNames(
                                    action.iconBackground,
                                    action.iconForeground,
                                    'inline-flex rounded-lg p-3 ring-4 ring-white',
                                )}
                            >
                                <action.icon aria-hidden="true" className="h-6 w-6" />
                            </span>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">
                                <Link href={action.href} className="focus:outline-none">
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    {action.title}
                                </Link>
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Quickly navigate to {action.title.toLowerCase()}.
                            </p>
                        </div>
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                        >
                            <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                            </svg>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
