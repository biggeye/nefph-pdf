'use client';

import { useState } from 'react'; // Removed `useEffect` since it's not used
import LicenseForm from '@/components/barcode/LicenseForm';
import { Heading } from '@/components/heading';

export default function Barcode() {
    return (
        <>
            <div className="flex items-end justify-between gap-4">
                <Heading>PDF417 Generator</Heading>
            </div>

            <LicenseForm />
        </>
    );
}
