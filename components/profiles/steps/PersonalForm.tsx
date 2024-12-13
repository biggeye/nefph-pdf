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
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <label htmlFor="first_name" className="text-sm font-medium text-gray-900">First Name:</label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={data.first_name || ''}
                    onChange={handleChange}
                    className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"
                />
            </div>

            {/* Last Name */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <label htmlFor="last_name" className="text-sm font-medium text-gray-900">Last Name:</label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={data.last_name || ''}
                    onChange={handleChange}
                    className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"
                />
            </div>

            {/* Email */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <label htmlFor="email" className="text-sm font-medium text-gray-900">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.email || ''}
                    onChange={handleChange}
                    className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"
                />
            </div>

            {/* Phone */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <label htmlFor="phone" className="text-sm font-medium text-gray-900">Phone:</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={data.phone || ''}
                    onChange={handleChange}
                    className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"
                />
            </div>

            {/* Address */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <label htmlFor="address" className="text-sm font-medium text-gray-900">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={data.address || ''}
                    onChange={handleChange}
                    className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"
                />
            </div>

            {/* City */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <label htmlFor="city" className="text-sm font-medium text-gray-900">City:</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={data.city || ''}
                    onChange={handleChange}
                    className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"
                />
            </div>

            {/* State */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <label htmlFor="state" className="text-sm font-medium text-gray-900">State:</label>
                <input
                    type="text"
                    id="state"
                    name="state"
                    value={data.state || ''}
                    onChange={handleChange}
                    className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"
                />
            </div>

            {/* ZIP */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <label htmlFor="zip" className="text-sm font-medium text-gray-900">ZIP Code:</label>
                <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={data.zip || ''}
                    onChange={handleChange}
                    className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"
                />
            </div>

            {/* Date of Birth */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <label htmlFor="dob" className="text-sm font-medium text-gray-900">Date of Birth:</label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={data.dob || ''}
                    onChange={handleChange}
                    className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"
                />
            </div>

            {/* SSN */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <label htmlFor="ssn" className="text-sm font-medium text-gray-900">SSN:</label>
                <input
                    type="text"
                    id="ssn"
                    name="ssn"
                    value={data.ssn || ''}
                    onChange={handleChange}
                    className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0"
                />
            </div>
        </form>
    );
};

export default PersonalForm;
