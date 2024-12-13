// /components/profiles/steps/LogsForm.tsx

'use client';

import { useState, useEffect } from 'react';
import { Logs } from '@/data/types/profiles';

type LogsFormProps = {
    data: Partial<Logs>[];
    onDataChange: (data: Partial<Logs>[]) => void;
};

export default function LogsForm({ data, onDataChange }: LogsFormProps) {
    const [formData, setFormData] = useState<Partial<Logs>[]>(data);

    useEffect(() => {
        onDataChange(formData);
    }, [formData]);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) =>
            prev.map((item, i) => (i === index ? { ...item, [name]: value } : item))
        );
    };

    const addLog = () => {
        setFormData((prev) => [...prev, {}]);
    };

    const removeLog = (index: number) => {
        setFormData((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
     };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Logs</h2>
            {formData.map((logEntry, index) => (
                <div key={index} className="mb-4 border-b border-gray-600 pb-4">
                    <h3 className="font-semibold mb-2">Log Entry {index + 1}</h3>
                    <div>
                        <label>Site</label>
                        <input
                            name="site"
                            value={logEntry.site || ''}
                            onChange={(e) => handleChange(index, e)}
                            required
                        />
                    </div>
                    <div>
                        <label>Username</label>
                        <input
                            name="username"
                            value={logEntry.username || ''}
                            onChange={(e) => handleChange(index, e)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            name="password"
                            value={logEntry.password || ''}
                            onChange={(e) => handleChange(index, e)}
                            required
                        />
                    </div>
                    <div>
                        <label>PIN</label>
                        <input
                            name="pin"
                            value={logEntry.pin || ''}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </div>
                    <div>
                        <label>Security Question</label>
                        <input
                            name="security_question"
                            value={logEntry.security_question || ''}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </div>
                    <div>
                        <label>Answer</label>
                        <input
                            name="answer"
                            value={logEntry.answer || ''}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </div>
                    <button type="button" onClick={() => removeLog(index)}>
                        Remove Entry
                    </button>
                </div>
            ))}
            <button type="button" onClick={addLog}>
                Add Another Log
            </button>
         
        </form>
    );
}
