// /components/profiles/steps/PersonalForm.tsx

import React from 'react';
import { Profile } from '@/data/types/profiles';

interface PersonalFormProps {
    data: Partial<Profile>;
    onDataChange: (data: Partial<Profile>) => void;
}

const PersonalForm: React.FC<PersonalFormProps> = ({ data, onDataChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onDataChange({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form>
            {/* First Name */}
            <div>
                <label htmlFor="first_name">First Name:</label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={data.first_name || ''}
                    onChange={handleChange}
                />
            </div>

            {/* Last Name */}
            <div>
                <label htmlFor="last_name">Last Name:</label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={data.last_name || ''}
                    onChange={handleChange}
                />
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.email || ''}
                    onChange={handleChange}
                />
            </div>

            {/* Phone */}
            <div>
                <label htmlFor="phone">Phone:</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={data.phone || ''}
                    onChange={handleChange}
                />
            </div>

            {/* Address */}
            <div>
                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={data.address || ''}
                    onChange={handleChange}
                />
            </div>

            {/* City */}
            <div>
                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={data.city || ''}
                    onChange={handleChange}
                />
            </div>

            {/* State */}
            <div>
                <label htmlFor="state">State:</label>
                <input
                    type="text"
                    id="state"
                    name="state"
                    value={data.state || ''}
                    onChange={handleChange}
                />
            </div>

            {/* ZIP */}
            <div>
                <label htmlFor="zip">ZIP Code:</label>
                <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={data.zip || ''}
                    onChange={handleChange}
                />
            </div>

            {/* Date of Birth */}
            <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={data.dob || ''}
                    onChange={handleChange}
                />
            </div>

            {/* Optional Fields */}
            {/* Add other fields as needed, following the same pattern */}
        </form>
    );
};

export default PersonalForm;
