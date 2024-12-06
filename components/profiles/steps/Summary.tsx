// /components/profiles/steps/Summary.tsx

'use client';

import {
    Profile,
    DL,
    Logs,
    Banks,
    Business,
} from '@/data/types/profiles';

interface SummaryProps {
    data: {
        personal: Partial<Profile>;
        dl: Partial<DL>;
        logs: Partial<Logs>[];
        banks: Partial<Banks>[];
        business: Partial<Business>;
    };
    onSubmit: () => void;
    onBack: () => void;
}

export default function Summary({ data, onSubmit, onBack }: SummaryProps) {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Summary</h2>

            {/* Personal Information */}
            <div>
                <h3>Personal Information</h3>
                <p>
                    Name: {data.personal.first_name} {data.personal.last_name}
                </p>
                {/* ... display other personal fields ... */}
            </div>

            {/* Conditionally render other sections if data is available */}
            {data.dl && Object.keys(data.dl).length > 0 && (
                <div>
                    <h3>Driver's License Information</h3>
                    {/* ... display DL data ... */}
                </div>
            )}

            {data.logs && data.logs.length > 0 && (
                <div>
                    <h3>Logs</h3>
                    {/* ... display logs ... */}
                </div>
            )}

            {data.banks && data.banks.length > 0 && (
                <div>
                    <h3>Banks</h3>
                    {/* ... display banks ... */}
                </div>
            )}

            {data.business && Object.keys(data.business).length > 0 && (
                <div>
                    <h3>Business Information</h3>
                    {/* ... display business data ... */}
                </div>
            )}

            <div className="mt-4 flex justify-between">
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-gray-300 rounded-md"
                >
                    Back
                </button>
                <button
                    onClick={onSubmit}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
