// components/PatientBenefitsSummary.tsx
import React from 'react';

interface PatientBenefitsSummaryProps {
    patient: any;
}

const PatientBenefitsSummary = ({ patient }: PatientBenefitsSummaryProps) => {
    return (
        <div>
            <p>Dtx: {patient.dtx || 'N/A'}</p>
            <p>Dtx Percent: {patient.dtx_percent || 'N/A'}</p>
            <p>RTC: {patient.rtc || 'N/A'}</p>
            <p>RTC Percent: {patient.rtc_percent || 'N/A'}</p>
            <p>PHP: {patient.php || 'N/A'}</p>
            <p>PHP Percent: {patient.php_percent || 'N/A'}</p>
        </div>
    );
};

export default PatientBenefitsSummary;
