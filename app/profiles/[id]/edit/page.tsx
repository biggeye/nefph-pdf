'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { createOrUpdateIndividual } from '@/utils/createOrUpdateIndividual';

export default function EditProfile() {
    const supabase = createClient();
    const { id } = useParams(); // Get the individual ID from the URL
    const router = useRouter();

    // Main form data including related fields
    const [individual, setIndividual] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        classification: '',
        restrictions: '',
        endorsements: '',
        hair_color: '',
        eye_color: '',
        height: '',
        weight: '',
        dd: '',
        icn: '',
        issue_date: '',
        expiration_date: '',
        picture_url: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Error state

    // Fetch individual details
    useEffect(() => {
        async function fetchIndividual() {
            if (id) {
                const { data, error } = await supabase
                    .from('individuals') // Fetch from the 'individuals' table
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    setError('Error fetching individual data');
                    console.error('Error fetching individual:', error);
                } else {
                    setIndividual(data); // Set form data with fetched details
                    setLoading(false);
                }
            } else {
                setLoading(false); // Stop loading if there's no ID
            }
        }

        fetchIndividual();
    }, [id, supabase]);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setIndividual((prevIndividual) => ({
            ...prevIndividual,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await createOrUpdateIndividual({ id, ...individual }); // Send form data

        if (response.success) {
            router.push(`/profiles/${id}`); // Redirect on success
        } else {
            setError(response.message); // Display error message on UI
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-semibold">{id ? 'Edit Profile' : 'Create Profile'}</h2>
            <form onSubmit={handleSave}>
                {/* Main Form Fields */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={individual.first_name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={individual.last_name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        value={individual.date_of_birth}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <input
                        type="text"
                        name="gender"
                        value={individual.gender}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                {/* Address Information */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={individual.address}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                        type="text"
                        name="city"
                        value={individual.city}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input
                        type="text"
                        name="state"
                        value={individual.state}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">ZIP</label>
                    <input
                        type="text"
                        name="zip"
                        value={individual.zip}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Additional fields like classification, hair color, eye color, etc. */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Hair Color</label>
                    <input
                        type="text"
                        name="hair_color"
                        value={individual.hair_color}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Save Button */}
                <div className="mt-4">
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        disabled={loading}
                    >
                        {id ? 'Save Changes' : 'Create Profile'}
                    </button>
                </div>
            </form>
        </div>
    );
}
