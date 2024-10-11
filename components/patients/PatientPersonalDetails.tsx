// components/PatientPersonalDetails.tsx
import React from 'react';

interface PatientPersonalDetailsProps {
    patient: any;
}

const PatientPersonalDetails = ({ patient }: PatientPersonalDetailsProps) => {
    return (
        <div>
            <p>Driver's License: {patient.dlnumber || 'N/A'}</p>
            <p>Issue Date: {patient.issuedate || 'N/A'}</p>
            <p>Expiry Date: {patient.expirydate || 'N/A'}</p>
            <p>Insurance Card Number (ICN): {patient.icn || 'N/A'}</p>
            <p>Tribe: {patient.tribe || 'N/A'}</p>
        </div>
    );
};

export default PatientPersonalDetails;
