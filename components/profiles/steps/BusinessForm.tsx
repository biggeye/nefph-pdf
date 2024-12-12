// /components/profiles/steps/BusinessForm.tsx

'use client';

import { useState } from 'react';
import { Business } from '@/data/types/profiles';

interface BusinessFormProps {
    data: Partial<Business>;
    onDataChange: (data: Partial<DL>) => void;
}

export default function BusinessForm({ data, onNext, onBack }: BusinessFormProps) {
    const [formData, setFormData] = useState<Partial<Business>>(data);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Business Information</h2>
            {/* Add fields and handle changes */}

        </form>
    );
}
