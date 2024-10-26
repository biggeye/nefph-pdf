'use client';

import { useState, useEffect } from 'react';
import LicenseForm from '@/components/barcode/LicenseForm';
import { Heading } from '@/components/heading';

export default function Barcode() {
    const [selectedPatient, setSelectedPatient] = useState(null);

    return (
        <>
            <div className="flex items-end justify-between gap-4">
                <Heading>PDF417 Generator</Heading>
            </div>

            <LicenseForm />
        </>
    );
}
