'use client'

import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function Profile() {
    const supabase = createClient();
    const { id } = useParams(); // Using useParams to get dynamic route ID
    const [person, setPerson] = useState(null);
    const [driverLicense, setDriverLicense] = useState(null);
    const [history, setHistory] = useState({ neighbors: [], criminalRecords: [], ownedAutos: [] });

    useEffect(() => {
        async function fetchPerson() {
            if (id) {
                const { data: individualData, error: personError } = await supabase
                    .from('individuals')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (personError) {
                    console.error('Error fetching person:', personError);
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
                }
            }
        }
        fetchPerson();
    }, [id]);

    if (!person) {
        return <div>Loading...</div>;
    }

    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            {/* Personal Details */}
            <div className="px-4 py-6 sm:px-6">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Details about the individual.</p>
            </div>
            <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Full name</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{person.name}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Aliases</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {person.alias ? person.alias.join(', ') : 'N/A'}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Phone numbers</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {/* Assuming the phone numbers are an array of objects */}
                            {person.phone_numbers ? person.phone_numbers.join(', ') : 'N/A'}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Address</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {person.addresses ? person.addresses.join(', ') : 'N/A'}
                        </dd>
                    </div>
                </dl>
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
                            {/* Add more driver's license details as needed */}
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
        </div>
    );
}
