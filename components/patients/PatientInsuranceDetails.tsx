// components/PatientInsuranceDetails.tsx
import React from 'react';

interface PatientInsuranceDetailsProps {
    patient: any;
}

const PatientInsuranceDetails = ({ patient }: PatientInsuranceDetailsProps) => {
    return (
        <div>
            
            <p>Insurance: {patient.insurance || 'N/A'}</p>
            <p>Insurance Phone: {patient.insurance_phonenumber || 'N/A'}</p>
            <p>Member ID: {patient.memberid || 'N/A'}</p>
            <p>Group ID: {patient.groupid || 'N/A'}</p>
            <p>Plan Type: {patient.plantype || 'N/A'}</p>
        </div>
    );
};

export default PatientInsuranceDetails;
