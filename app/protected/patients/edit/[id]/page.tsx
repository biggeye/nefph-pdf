'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { createOrUpdatePatient } from '@/utils/createOrUpdate/patients';

export default function EditProfile() {
    const supabase = createClient();
    const { id } = useParams(); // Get the profile ID from the URL
    const router = useRouter();

    const [person, setPerson] = useState({
        first_name: '',
        last_name: '',
        dob: '',
        age: '',
        ssn: '',
        insurance_provider: '',
        insurance_policy_number: '',
        insurance_effective_date: '',
        insurance_expiration_date: '',
        phone: '',
        email: '',
        tribe: '',
        address: '',
        dlnumber: '',
        issuedate: '',
        expirydate: '',
        icn: '',
        dd: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Error state

    // State to toggle DL information fields
    const [showDlInfo, setShowDlInfo] = useState(false);

    // Fetch patient details
    useEffect(() => {
        async function fetchPerson() {
            if (id) {
                const { data, error } = await supabase
                    .from('patientinfo') // Assuming 'patientinfo' is the correct table
                    .select('*')
                    .eq('patient_id', id)
                    .single();

                if (error) {
                    setError('Error fetching patient data');
                    console.error('Error fetching person:', error);
                } else {
                    setPerson(data); // Set form data with fetched details
                    setLoading(false);
                }
            } else {
                setLoading(false); // Stop loading if there's no ID
            }
        }

        fetchPerson();
    }, [id, supabase]);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPerson((prevPerson) => ({
            ...prevPerson,
            [name]: value,
        }));
    };


    const toggleDlInfo = () => {
        setShowDlInfo((prevShow) => !prevShow);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    // Handle form submission
    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await createOrUpdatePatient({ id, ...person }); // Send form data

        if (response.success) {
            router.push('/patients'); // Redirect on success
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
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={person.firstname}
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
                        value={person.lastname}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={person.dob}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={person.age}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">SSN</label>
                    <input
                        type="text"
                        name="ssn"
                        value={person.ssn}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Insurance Provider</label>
                    <input
                        type="text"
                        name="insurance_provider"
                        value={person.insurance}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
               
                    <label className="block text-sm font-medium text-gray-700">Insurance Policy Number</label>
                    <input
                        type="text"
                        name="Member ID"
                        value={person.memberid}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Insurance Effective Date</label>
                    <input
                        type="date"
                        name="insurance_effective_date"
                        value={person.planeffectivedate}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Insurance Expiration Date</label>
                    <input
                        type="date"
                        name="insurance_expiration_date"
                        value={person.planterminationdate}
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
                        required
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
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Tribe</label>
                    <input
                        type="text"
                        name="tribe"
                        value={person.tribe}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={person.address}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                {/* Button to toggle DL information */}
                <div className="mt-4">
                    <button
                        type="button"
                        onClick={toggleDlInfo}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {showDlInfo ? 'Hide DL Information' : 'Add DL Information'}
                    </button>
                </div>

                {/* DL Information Fields (shown if button is clicked) */}
                {showDlInfo && (
                    <div className="mt-4 border-t border-gray-300 pt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">DL Number</label>
                            <input
                                type="text"
                                name="dlnumber"
                                value={person.dlnumber}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                            <input
                                type="date"
                                name="issuedate"
                                value={person.issuedate}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                            <input
                                type="date"
                                name="expirydate"
                                value={person.expirydate}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">ICN</label>
                            <input
                                type="text"
                                name="icn"
                                value={person.icn}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">DD</label>
                            <input
                                type="text"
                                name="dd"
                                value={person.dd}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                )}
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
