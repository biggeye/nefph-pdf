'use client';

import { useState, useEffect } from 'react';
import { Business } from '@/data/types/profiles';

interface BusinessFormProps {
    data: Partial<Business>;
    onDataChange: (data: Partial<Business>) => void;
}

export default function BusinessForm({ data, onDataChange }: BusinessFormProps) {
    const [formData, setFormData] = useState<Partial<Business>>(data);

    useEffect(() => {
        onDataChange(formData);
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onDataChange(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Business Information</h2>
            <label>
                Business Name:
                <input
                    type="text"
                    name="business_name"
                    value={formData.business_name || ''}
                    onChange={handleChange}
                />
            </label>
            {/* Add more fields as needed */}
            <button type="submit" className="mt-4 inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700">
                Save
            </button>
        </form>
    );
}

