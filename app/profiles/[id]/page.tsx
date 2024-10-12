'use client';

import { PaperClipIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function Profile() {
    const supabase = createClient();
    const { id } = useParams(); // Get dynamic route ID
    const router = useRouter();
    const [person, setPerson] = useState(null);
    const [driverLicense, setDriverLicense] = useState(null);
    const [history, setHistory] = useState({ neighbors: [], criminalRecords: [], ownedAutos: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch individual details and related data
    useEffect(() => {
        async function fetchPerson() {
            if (id) {
                const { data: individualData, error: personError } = await supabase
                    .from('individuals')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (personError) {
                    setError('Error fetching person data.');
                    console.error(personError);
                    setLoading(false);
                } else {
                    setPerson(individualData);

                    // Fetch related driver's license information
                    const { data: licenseData, error: licenseError } = await supabase
                        .from('DriversLicense')
                        .select('*')
                        .eq('individual_id', id)
                        .single();

                    if (!licenseError) setDriverLicense(licenseData);

                    // Fetch additional history information
                    const { data: neighborsData } = await supabase
                        .from('neighbors')
                        .select('*')
                        .eq('individual_id', id);

                    const { data: criminalRecordsData } = await supabase
                        .from('criminalRecords')
                        .select('*')
                        .eq('individual_id', id);

                    const { data: ownedAutosData } = await supabase
                        .from('ownedAutos')
                        .select('*')
                        .eq('individual_id', id);

                    setHistory({
                        neighbors: neighborsData || [],
                        criminalRecords: criminalRecordsData || [],
                        ownedAutos: ownedAutosData || [],
                    });

                    setLoading(false);
                }
            }
        }
        fetchPerson();
    }, [id, supabase]);

    // Redirect to the edit page
    const handleEditClick = () => {
        router.push(`/profiles/${id}/edit`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="max-w-4xl mx-auto p-6">
                {/* Profile Header Section */}
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <div>
                        <h1 className="text-3xl font-semibold">
                            {person.first_name} {person.last_name}
                        </h1>
                        <p className="text-gray-600">Date of Birth: {person.dob}</p>
                        <p className="text-gray-600">Email: {person.email}</p>
                        <p className="text-gray-600">Phone: {person.phone}</p>
                    </div>

                    {/* Avatar Placeholder */}
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                            {/* Avatar Placeholder */}
                            <span className="text-gray-500">Avatar</span>
                        </div>

                        {/* Edit Button */}
                        <button
                            onClick={handleEditClick}
                            className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Additional Profile Details Section */}
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Additional Information</h2>
                    <p className="text-gray-600">Gender: {person.gender}</p>
                    <p className="text-gray-600">Address: {person.address}</p>
                </div>

                {/* Identification (Driver's License) */}
                {driverLicense && (
                    <div className="border-t border-gray-100">
                        <div className="px-4 py-6 sm:px-6">
                            <h3 className="text-base font-semibold leading-7 text-gray-900">Driver's License Information</h3>
                        </div>
                        <div className="border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">DL Number</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{driverLicense.dl_number}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">Issue Date</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{driverLicense.issue_date}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">Expiration Date</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{driverLicense.expiration_date}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                )}

                {/* History */}
                <div className="border-t border-gray-100">
                    <div className="px-4 py-6 sm:px-6">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">History</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Neighbors, criminal records, owned autos, etc.</p>
                    </div>
                    <div className="border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">Neighbors</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {history.neighbors.length ? history.neighbors.join(', ') : 'No neighbors found'}
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">Criminal Records</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {history.criminalRecords.length ? history.criminalRecords.join(', ') : 'No criminal records found'}
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">Owned Autos</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {history.ownedAutos.length ? history.ownedAutos.join(', ') : 'No autos found'}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Attachments */}
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                <div className="flex w-0 flex-1 items-center">
                                    <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                        <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                                        <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                                    </div>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Download
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </dd>
                </div>
            </div>
        </div>
    );
}
