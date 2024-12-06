// /components/profiles/steps/LogsForm.tsx

'use client';

import { useState } from 'react';
import { Logs } from '@/data/types/profiles';

interface LogsFormProps {
    data: Partial<Logs>[];
    onNext: (data: Partial<Logs>[]) => void;
    onBack: () => void;
}

export default function LogsForm({ data, onNext, onBack }: LogsFormProps) {
    const [logsData, setLogsData] = useState<Partial<Logs>[]>(data.length > 0 ? data : [{}]);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLogsData((prevLogs) => {
            const newLogs = [...prevLogs];
            newLogs[index] = {
                ...newLogs[index],
                [name]: value,
            };
            return newLogs;
        });
    };

    const addLog = () => {
        setLogsData((prevLogs) => [...prevLogs, {}]);
    };

    const removeLog = (index: number) => {
        setLogsData((prevLogs) => prevLogs.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext(logsData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Logs</h2>
            {logsData.map((logEntry, index) => (
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
