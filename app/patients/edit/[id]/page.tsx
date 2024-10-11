'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function EditProfile() {
    const supabase = createClient();
    const { id } = useParams(); // Get the profile ID from the URL
    const router = useRouter();
    const [person, setPerson] = useState({
        name: '',
        aliases: [],
        email: '',
        phone: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPerson() {
            if (id) {
                const { data, error } = await supabase
                    .from('individuals')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error('Error fetching person:', error);
                } else {
                    setPerson(data);
                    setLoading(false);
                }
            }
        }
        fetchPerson();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPerson((prevPerson) => ({
            ...prevPerson,
            [name]: value,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const { error } = await supabase
            .from('individuals')
            .update({ ...person })
            .eq('id', id);

        if (error) {
            console.error('Error updating person:', error);
        } else {
            router.push(`/app/profiles/${id}`); // Navigate back to the profile detail page
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-semibold">Edit Profile</h2>
            <form onSubmit={handleSave}>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={person.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={person.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        value={person.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
