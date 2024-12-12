// /components/profiles/steps/BanksForm.tsx

'use client';

import { useState } from 'react';
import { Banks } from '@/data/types/profiles';

interface BanksFormProps {
    data: Partial<Banks>[];
    onDataChange: (data: Partial<DL>) => void;
}

export default function BanksForm({ data, onNext, onBack }: BanksFormProps) {
    const [banksData, setBanksData] = useState<Partial<Banks>[]>(data.length > 0 ? data : [{}]);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBanksData((prevBanks) => {
            const newBanks = [...prevBanks];
            newBanks[index] = {
                ...newBanks[index],
                [name]: value,
            };
            return newBanks;
        });
    };

    const addBank = () => {
        setBanksData((prevBanks) => [...prevBanks, {}]);
    };

    const removeBank = (index: number) => {
        setBanksData((prevBanks) => prevBanks.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext(banksData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Banks</h2>
            {banksData.map((bankEntry, index) => (
                <div key={index} className="mb-4 border-b border-gray-600 pb-4">
                    <h3 className="font-semibold mb-2">Bank Entry {index + 1}</h3>
                    <div>
                        <label>Bank Name</label>
                        <input
                            name="bank_name"
                            value={bankEntry.bank_name || ''}
                            onChange={(e) => handleChange(index, e)}
                            required
                        />
                    </div>
                    <div>
                        <label>Account Number</label>
                        <input
                            name="account_number"
                            value={bankEntry.account_number || ''}
                            onChange={(e) => handleChange(index, e)}
                            required
                        />
                    </div>
                    <div>
                        <label>Routing Number</label>
                        <input
                            name="routing_number"
                            value={bankEntry.routing_number || ''}
                            onChange={(e) => handleChange(index, e)}
                            required
                        />
                    </div>
                    <div>
                        <label>Account Type</label>
                        <input
                            name="account_type"
                            value={bankEntry.account_type || ''}
                            onChange={(e) => handleChange(index, e)}
                            required
                        />
                    </div>
                    <button type="button" onClick={() => removeBank(index)}>
                        Remove Entry
                    </button>
                </div>
            ))}
            <button type="button" onClick={addBank}>
                Add Another Bank
            </button>
         
        </form>
    );
}
