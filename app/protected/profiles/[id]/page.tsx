'use client'; // If you're using the App Router

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchIndividual, fetchDriversLicense, fetchRelatedRecords } from '@/utils/fetch/profiles'; // Ensure correct path for your utils

export default function Profile() {
    const { id } = useParams();
    const router = useRouter();

    const [person, setPerson] = useState(null);
    const [driverLicense, setDriverLicense] = useState(null);
    const [history, setHistory] = useState({
        addresses: [],
        emails: [],
        phoneNumbers: [],
        criminalRecords: [],
        ownedAutos: [],
        jobs: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPersonDetails() {
            // Check if the `id` exists
            if (!id) {
                setError('Invalid ID parameter.');
                setLoading(false);
                return;
            }

            try {
                const { data: individualData, error: personError } = await fetchIndividual(id);
                if (personError) throw personError;
                setPerson(individualData);

                const { data: licenseData } = await fetchDriversLicense(id);
                setDriverLicense(licenseData);

                const relatedRecords = await fetchRelatedRecords(id);
                setHistory(relatedRecords);

                setLoading(false);
            } catch (fetchError) {
                setError('Error fetching person details.');
                console.error(fetchError);
                setLoading(false);
            }
        }

        fetchPersonDetails();
    }, [id]);

    const handleEditClick = () => {
        if (id) {
            router.push(`/protected/profiles/${id}/edit`);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="max-w-4xl mx-auto p-6">
                {/* Profile Header Section */}
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <div>
                        <h1 className="text-3xl font-semibold">
                            {person?.first_name} {person?.last_name}
                        </h1>
                        <p className="text-gray-600">Date of Birth: {person?.dob}</p>
                        <p className="text-gray-600">SSN: {person?.ssn}</p>
                        <p className="text-gray-600">Email: {person?.email}</p>
                        <p className="text-gray-600">Phone: {person?.phone}</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-gray-500">Avatar</span>
                        </div>

                        <button
                            onClick={handleEditClick}
                            className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>

                
            </div>
        </div>
    );
}
