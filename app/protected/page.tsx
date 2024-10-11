'use client';
import { useState, useEffect } from 'react';
import { fetchPatients } from '@/utils/fetchPatientDetails';
import PatientInsuranceDetails from '@/components/patients/PatientInsuranceDetails';
import PatientPersonalDetails from '@/components/patients/PatientPersonalDetails';
import PatientBenefitsSummary from '@/components/patients/PatientBenefitsSummary';

export default function PatientOverview() {
    const [patients, setPatients] = useState([]);
    const [expandedPatientId, setExpandedPatientId] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch patient data
    useEffect(() => {
        const loadPatients = async () => {
            setLoading(true);
            const data = await fetchPatients();
            setPatients(data);
            setLoading(false);
        };
        loadPatients();
    }, []);

    const toggleExpand = (patientId) => {
        setExpandedPatientId((prevId) => (prevId === patientId ? null : patientId));
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-4">
            {/* Header Section with Stats */}
            <header>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Patient Overview</h1>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Total Patients: {patients.length}</p>
            </header>

            {/* Patient List */}
            <div className="pt-11">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {patients.map((patient) => (
                        <li key={patient.patient_id} className="flex flex-col gap-y-4">
                            {/* Patient Summary Row */}
                            <div className="flex items-center justify-between gap-x-6 py-5">
                                <div className="flex min-w-0 gap-x-4">
                                    <img
                                        alt=""
                                        src={
                                            patient.imageUrl ||
                                            'https://via.placeholder.com/48?text=Avatar'
                                        }
                                        className="h-12 w-12 flex-none rounded-full bg-gray-50 dark:bg-gray-700"
                                    />
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                                            {patient.firstname} {patient.lastname}
                                        </p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-400">
                                            {patient.email || 'No email available'}
                                        </p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500 dark:text-gray-400">
                                            Phone: {patient.patient_phone || 'No phone available'}
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden lg:block">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Status: {patient.status || 'Unknown'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => toggleExpand(patient.patient_id)}
                                    className="rounded-full bg-white dark:bg-gray-700 px-2.5 py-1 text-xs font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    {expandedPatientId === patient.patient_id ? 'Hide Details' : 'View Details'}
                                </button>
                            </div>

                            {/* Expanded Patient Details */}
                            {expandedPatientId === patient.patient_id && (
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 mt-2 rounded-md">
                                    <PatientInsuranceDetails patient={patient} />
                                    <PatientPersonalDetails patient={patient} />
                                    <PatientBenefitsSummary patient={patient} />
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
