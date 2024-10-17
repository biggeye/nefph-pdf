'use client'

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import {
    fetchIndividual,
    fetchDriversLicense,
    fetchRelatedRecords
} from '@/utils/fetch/profiles';
import { createOrUpdateIndividual } from '@/utils/createOrUpdate/individuals'; // Utility for create/update

const CreateProfileForm = () => {
    const supabase = createClient();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [ssn, setSsn] = useState('');

    const [individualId, setIndividualId] = useState<number | null>(null);
    const [addresses, setAddresses] = useState(['']);
    const [aliases, setAliases] = useState(['']);
    const [phoneNumbers, setPhoneNumbers] = useState(['']);
    const [emails, setEmails] = useState(['']);
    const [jobs, setJobs] = useState([]);
    const [ownedAutomobiles, setOwnedAutomobiles] = useState([]);
    const [criminalRecords, setCriminalRecords] = useState([]);
    const [driversLicense, setDriversLicense] = useState(null);

    const [isDLExpanded, setIsDLExpanded] = useState(false);
    const [dlForm, setDLForm] = useState({
        dl_number: '',
        issue_date: '',
        expiration_date: '',
        dob: '',
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
        dd: '',
        icn: '',
        picture_url: '',
    });

    // Handle adding dynamic fields
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

    // Fetch related data when individual ID is present
    useEffect(() => {dbi
        if (individualId) {
            fetchIndividual(individualId).then(setIndividualId);
            fetchDriversLicense(individualId).then(setDriversLicense);
            fetchRelatedRecords(individualId).then(setRelatedRecords);
        }
    }, [individualId]);

    // Submit handler
    const handleSubmit = async (event) => {
        event.preventDefault();

        const individualData = {
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            ssn,
            addresses,
            aliases,
            phoneNumbers,
            emails,
            jobs,
            criminalRecords,
            ownedAutomobiles,
            dlForm: isDLExpanded ? dlForm : null, // Include driver's license only if expanded
        };

        try {
            const response = await createOrUpdateIndividual(individualData);

            if (response.success) {
                console.log('Individual and related records added successfully!');
            } else {
                console.error('Error:', response.message);
            }
        } catch (insertError) {
            console.error('Error inserting data:', insertError);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
                    +
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
                    +
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
                    +
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
                    +
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
                    {/* Other DL fields... */}
                    <input
                        type="date"
                        name="issue_date"
                        placeholder="Issue Date"
                        value={dlForm.issue_date}
                        onChange={handleDLChange}
                    />
                    {/* More fields as needed */}
                </div>
            )}

            <button type="submit">Submit</button>
        </form>
    );
};

export default CreateProfileForm;
