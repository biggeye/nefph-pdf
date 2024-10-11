'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import {
    fetchAddresses,
    fetchCriminalRecords,
    fetchDriversLicense,
    fetchEmails,
    fetchJobs,
    fetchOwnedAutomobiles,
} from '@/utils/profileFetchers';

const CreateNewEntry = () => {
    const supabase = createClient();
    
    // Add missing name state
    const [name, setName] = useState(''); // <-- This was missing
    
    const [individualId, setIndividualId] = useState<number | null>(null);
    const [addresses, setAddresses] = useState(['']);
    const [aliases, setAliases] = useState(['']);
    const [phoneNumbers, setPhoneNumbers] = useState(['']);
    const [emails, setEmails] = useState(['']);
    const [jobs, setJobs] = useState([]);
    const [ownedAutomobiles, setOwnedAutomobiles] = useState([]);
    const [criminalRecords, setCriminalRecords] = useState([]);
    const [driversLicense, setDriversLicense] = useState(null);

    useEffect(() => {
        if (individualId) {
            fetchAddresses(individualId).then(setAddresses);
            fetchCriminalRecords(individualId).then(setCriminalRecords);
            fetchDriversLicense(individualId).then(setDriversLicense);
            fetchEmails(individualId).then(setEmails);
            fetchJobs(individualId).then(setJobs);
            fetchOwnedAutomobiles(individualId).then(setOwnedAutomobiles);
        }
    }, [individualId]);

    const [isDLExpanded, setIsDLExpanded] = useState(false);
    const [dlForm, setDLForm] = useState({
        dl_number: '',
        issue_date: '',
        expiration_date: '',
        date_of_birth: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        classification: '',
        restrictions: '',
        endorsements: '',
        gender: '',
        hair_color: '',
        eye_color: '',
        height: '',
        weight: '',
        dd_number: '',
        icn_number: '',
        picture_url: '',
    });

    const handleAddField = (setFunction, values) => {
        setFunction([...values, '']);
    };

    const handleInputChange = (setFunction, values, index, value) => {
        const newValues = [...values];
        newValues[index] = value;
        setFunction(newValues);
    };

    const handleDLChange = (e) => {
        const { name, value } = e.target;
        setDLForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Insert the individual data (name, aliases)
            const { data, error: individualError } = await supabase
                .from('individuals')
                .insert([{ name }])  // <-- Now this will work since `name` state is defined
                .select();  // Selecting inserted row to get its ID

            if (individualError) {
                console.error('Error inserting individual:', individualError);
                return;
            }

            if (!data || data.length === 0) {
                console.error('No individual data returned from the insert operation.');
                return;
            }

            const individualId = data[0].id;  // Get the inserted individual's ID

            // Insert related dynamic fields (addresses, phone numbers, emails)
            await Promise.all(
                addresses.filter(Boolean).map(async (address) => {
                    await supabase.from('addresses').insert([{ individual_id: individualId, address }]);
                })
            );

            await Promise.all(
                phoneNumbers.filter(Boolean).map(async (phone_number) => {
                    await supabase.from('phones').insert([{ individual_id: individualId, phone_number }]);
                })
            );

            await Promise.all(
                emails.filter(Boolean).map(async (email_address) => {
                    await supabase.from('emails').insert([{ individual_id: individualId, email_address }]);
                })
            );

            // Insert driver's license if expanded and filled
            if (isDLExpanded && dlForm.dl_number) {
                await supabase.from('driverslicense').insert([{ ...dlForm, individual_id: individualId }]);
            }

            console.log('Individual and related records added successfully!');
        } catch (insertError) {
            console.error('Error inserting data:', insertError);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}  // Corrected error here
                    required
                />
            </div>

            {/* Alias Inputs */}
            <div>
                <label>Alias(es):</label>
                {aliases.map((alias, index) => (
                    <input
                        key={index}
                        type="text"
                        value={alias}
                        onChange={(e) => handleInputChange(setAliases, aliases, index, e.target.value)}
                    />
                ))}
                <button type="button" onClick={() => handleAddField(setAliases, aliases)}>
                    Add Another Alias
                </button>
            </div>

            {/* Address Inputs */}
            <div>
                <label>Address(es):</label>
                {addresses.map((address, index) => (
                    <input
                        key={index}
                        type="text"
                        value={address}
                        onChange={(e) => handleInputChange(setAddresses, addresses, index, e.target.value)}
                    />
                ))}
                <button type="button" onClick={() => handleAddField(setAddresses, addresses)}>
                    Add Another Address
                </button>
            </div>

            {/* Phone Number Inputs */}
            <div>
                <label>Phone Number(s):</label>
                {phoneNumbers.map((phone, index) => (
                    <input
                        key={index}
                        type="text"
                        value={phone}
                        onChange={(e) => handleInputChange(setPhoneNumbers, phoneNumbers, index, e.target.value)}
                    />
                ))}
                <button type="button" onClick={() => handleAddField(setPhoneNumbers, phoneNumbers)}>
                    Add Another Phone Number
                </button>
            </div>

            {/* Email Inputs */}
            <div>
                <label>Email Address(es):</label>
                {emails.map((email, index) => (
                    <input
                        key={index}
                        type="email"
                        value={email}
                        onChange={(e) => handleInputChange(setEmails, emails, index, e.target.value)}
                    />
                ))}
                <button type="button" onClick={() => handleAddField(setEmails, emails)}>
                    Add Another Email
                </button>
            </div>

            {/* Button to Toggle DL Input Fields */}
            <div>
                <button type="button" onClick={() => setIsDLExpanded(!isDLExpanded)}>
                    {isDLExpanded ? 'Hide Driver\'s License Fields' : 'Add Driver\'s License Info'}
                </button>
            </div>

            {/* Driver's License Input Fields */}
            {isDLExpanded && (
                <div className="mt-4 border-t pt-4">
                    <h3>Driver's License Information</h3>
                    <input
                        type="text"
                        name="dl_number"
                        placeholder="DL Number"
                        value={dlForm.dl_number}
                        onChange={handleDLChange}
                    />
                    <input
                        type="date"
                        name="issue_date"
                        placeholder="Issue Date"
                        value={dlForm.issue_date}
                        onChange={handleDLChange}
                    />
                    <input
                        type="date"
                        name="expiration_date"
                        placeholder="Expiration Date"
                        value={dlForm.expiration_date}
                        onChange={handleDLChange}
                    />
                    <input
                        type="date"
                        name="date_of_birth"
                        placeholder="Date of Birth"
                        value={dlForm.date_of_birth}
                        onChange={handleDLChange}
                    />
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={dlForm.first_name}
                        onChange={handleDLChange}
                    />
                    {/* Add more DL fields as needed */}
                </div>
            )}

            <button type="submit">Submit</button>
        </form>
    );
};

export default CreateNewEntry;
