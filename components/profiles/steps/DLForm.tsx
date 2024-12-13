'use client';

import { useState, useEffect } from 'react';
import { DL } from '@/data/types/profiles';

type DLFormProps = {
    data: Partial<DL>;
    onDataChange: (data: Partial<DL>) => void;
};

export default function DLForm({ data, onDataChange }: DLFormProps) {
    const [formData, setFormData] = useState<Partial<DL>>(data);

    useEffect(() => {
        onDataChange(formData);
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div>
            <label>
                DL Number:
                <input
                    type="text"
                    name="dl_number"
                    value={formData.dl_number || ''}
                    onChange={handleChange}
                />
            </label>
            {/* Add more fields as needed */}
        </div>
    );
}
