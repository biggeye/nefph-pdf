'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createOrUpdateIndividual } from '@/utils/createOrUpdate/individuals';
import { fetchIndividual, fetchRelatedRecords } from '@/utils/fetch/profiles';
import UpdateProfileForm from '@/components/profiles/UpdateProfile'; // Import the new form component

export default function EditProfile() {
    const { id } = useParams(); // Get the individual ID from the URL
    const router = useRouter();

    const [individual, setIndividual] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        hair_color: '',
        eye_color: '',
        height: '',
        weight: '',
    });

    const [aliases, setAliases] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [emails, setEmails] = useState([]);
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [criminalRecords, setCriminalRecords] = useState([]);
    const [ownedAutomobiles, setOwnedAutomobiles] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Error state

    // Fetch individual details and related data
    useEffect(() => {
        async function fetchIndividualDetails() {
            if (id) {
                try {
                    const { data: individualData } = await fetchIndividual(id);
                    setIndividual(individualData);

                    const relatedRecords = await fetchRelatedRecords(id);
             //     setAliases(relatedRecords.aliases || []);
                    setAddresses(relatedRecords.addresses || []);
                    setEmails(relatedRecords.emails || []);
                    setPhoneNumbers(relatedRecords.phoneNumbers || []);
                    setCriminalRecords(relatedRecords.criminalRecords || []);
                    setOwnedAutomobiles(relatedRecords.ownedAutos || []);
                    setJobs(relatedRecords.jobs || []);

                    setLoading(false);
                } catch (error) {
                    setError('Error fetching data');
                    setLoading(false);
                }
            } else {
                setLoading(false); // Stop loading if no ID
            }
        }

        fetchIndividualDetails();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setIndividual((prevIndividual) => ({
            ...prevIndividual,
            [name]: value,
        }));
    };

    const handleDynamicInputChange = (setFunction, values, index, value) => {
        const newValues = [...values];
        newValues[index] = value;
        setFunction(newValues);
    };

    const handleAddField = (setFunction, values) => {
        setFunction([...values, '']);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await createOrUpdateIndividual({
            id,
            ...individual,
            aliases,
            addresses,
            emails,
            phoneNumbers,
            criminalRecords,
            ownedAutomobiles,
            jobs,
        });

        if (response.success) {
            router.push(`protected/profiles/${id}`);
        } else {
            setError(response.message);
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <UpdateProfileForm
            individual={individual}
            aliases={aliases}
            addresses={addresses}
            emails={emails}
            phoneNumbers={phoneNumbers}
            criminalRecords={criminalRecords}
            ownedAutomobiles={ownedAutomobiles}
            jobs={jobs}
            handleInputChange={handleInputChange}
            handleDynamicInputChange={handleDynamicInputChange}
            handleAddField={handleAddField}
            handleSave={handleSave}
            loading={loading}
            id={id}
        />
    );
}
