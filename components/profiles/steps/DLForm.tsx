// /components/profiles/steps/DLForm.tsx

'use client';

import { useState } from 'react';
import { DL } from '@/data/types/profiles';

interface DLFormProps {
    data: Partial<DL>;
    onDataChange: (data: Partial<DL>) => void;
}

export default function DLForm({ data, onNext, onBack }: DLFormProps) {
    const [formData, setFormData] = useState<Partial<DL>>(data);

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
            <h2 className="text-xl font-bold mb-4">Driver's License Information</h2>
            {/* Add fields and handle changes */}

        </form>
    );
}
