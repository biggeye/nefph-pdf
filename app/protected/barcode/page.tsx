'use client';

import { useState, useEffect } from 'react';
import { fetchPatients } from '@/utils/fetchPatientDetails';
import LicenseForm from '@/components/barcode/LicenseForm';
import { Heading } from '@/components/heading';

const PatientSelect = ({ onPatientSelect }) => {
    const [patients, setPatients] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

    // Fetch patients on component load
    useEffect(() => {
        const loadPatients = async () => {
            const data = await fetchPatients();
            setPatients(data);
        };
        loadPatients();
    }, []);

    // Filter patients based on the selected state
    useEffect(() => {
        if (selectedState) {
            const filtered = patients.filter((patient) => patient.state === selectedState);
            setFilteredPatients(filtered);
        } else {
            setFilteredPatients([]);
        }
    }, [selectedState, patients]);

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setSelectedPatient(null); // Reset patient when state changes
        onPatientSelect(null); // Reset parent form when state changes
    };

    const handlePatientChange = (e) => {
        const patientId = e.target.value;
        const patient = filteredPatients.find((patient) => patient.patient_id === patientId);
        setSelectedPatient(patient);
        onPatientSelect(patient); // Pass selected patient to parent
    };

    return (
        <div className="flex gap-4 mb-6">
            {/* Select State */}
            <div>
                <label htmlFor="state-select" className="block text-sm font-medium text-gray-700">
                    Select State
                </label>
                <select
                    id="state-select"
                    value={selectedState}
                    onChange={handleStateChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">Select a state</option>
                    {[...new Set(patients.map((patient) => patient.state))].map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
            </div>

            {/* Select Patient */}
            <div>
                <label htmlFor="patient-select" className="block text-sm font-medium text-gray-700">
                    Select Patient
                </label>
                <select
                    id="patient-select"
                    value={selectedPatient?.patient_id || ''}
                    onChange={handlePatientChange}
                    disabled={!selectedState}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">Select a patient</option>
                    {filteredPatients.map((patient) => (
                        <option key={patient.patient_id} value={patient.patient_id}>
                            {patient.firstname} {patient.lastname}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default function Barcode() {
    const [selectedPatient, setSelectedPatient] = useState(null);

    return (
        <>
            <div className="flex items-end justify-between gap-4">
                <Heading>PDF417 Generator</Heading>
            </div>

            {/* Patient Select Dropdowns */}
            <PatientSelect onPatientSelect={setSelectedPatient} />

            {/* Pass selected patient's data to the LicenseForm */}
            <LicenseForm selectedPatient={selectedPatient} />
        </>
    );
}
