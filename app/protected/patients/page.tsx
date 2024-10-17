'use client';
import { useState, useEffect } from 'react';
import { fetchPatients } from '@/utils/fetch/patientDetails';
import { fetchPlacements } from '@/utils/fetch/placementDetails';
import { insertPatient } from '@/utils/create';
import PatientInsuranceDetails from '@/components/patients/PatientInsuranceDetails';
import PatientPersonalDetails from '@/components/patients/PatientPersonalDetails';
import PatientBenefitsSummary from '@/components/patients/PatientBenefitsSummary';
import Link from 'next/link';
export default function PatientOverview() {
     const [isSectionOpen, setIsSectionOpen] = useState({
    personalDetails: false,
    identification: false,
    history: false,
  });

  const toggleSection = (section) => {
    setIsSectionOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
    const [patients, setPatients] = useState([]);
    const [expandedPatientId, setExpandedPatientId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPlacements, setCurrentPlacements] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [newPatient, setNewPatient] = useState({ firstname: '', lastname: '', email: '', phone: '' }); // State for new patient form

    // Fetch patient data and placements
    useEffect(() => {
        const loadPatientsAndPlacements = async () => {
            setLoading(true);
            try {
                const dataPatients = await fetchPatients();
                const dataPlacements = await fetchPlacements();

                setPatients(dataPatients);
                setCurrentPlacements(dataPlacements.length);
            } catch (error) {
                console.error("Error loading data:", error);
            }
            setLoading(false);
        };
        loadPatientsAndPlacements();
    }, []);

    const toggleExpand = (patientId) => {
        setExpandedPatientId(expandedPatientId === patientId ? null : patientId);
    };

    const handleNewPatientChange = (e) => {
        const { name, value } = e.target;
        setNewPatient((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddPatient = () => {
        // Here you would handle form submission, e.g., send data to an API
        insertPatient(newPatient);
        console.log('New Patient:', newPatient);
        setIsModalOpen(false); // Close modal after adding
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-4">
            {/* Header Section with Stats and "New Patient" Button */}
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Patient Overview
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">Total Patients: {patients.length}</p>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => setIsModalOpen(true)} // Open the modal when clicked
                    >
                        New Patient
                    </button>
                </div>
            </div>

            {/* Placeholder Stats */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="bg-white shadow-sm rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-500">Current Placements</h3>
                    <p className="mt-2 text-2xl font-semibold text-gray-900">{currentPlacements}</p>
                </div>
            </div>

            {/* Patient List */}
            <div className="pt-11">
                <ul role="list" className="divide-y divide-gray-200">
                    {patients.map((patient) => (
                        <li key={patient.patient_id} className="py-5">
                            <div className="flex items-center justify-between gap-x-6">
                                <div className="flex min-w-0 gap-x-4">
                                    <img
                                        alt="Avatar"
                                        src={patient.imageUrl || 'https://via.placeholder.com/48?text=Avatar'}
                                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                    />
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                            <Link href={`/patients/${patient.patient_id}`}>
                                                {patient.firstname} {patient.lastname}
                                            </Link>
                                        </p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                            {patient.email || 'No email available'}
                                        </p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                            Phone: {patient.patient_phone || 'No phone available'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleExpand(patient.patient_id)}
                                    className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    {expandedPatientId === patient.patient_id ? 'Hide Details' : 'View Details'}
                                </button>
                            </div>

                            {expandedPatientId === patient.patient_id && (
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 mt-4 rounded-md">
                                    {/* Insurance Details Section */}
                                    <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300 pb-1">Insurance Details</h2>
                                    <PatientInsuranceDetails patient={patient} />

                                    {/* Personal Information Section */}
                                    <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2 border-b border-gray-300 pb-1">Personal Information</h2>
                                    <PatientPersonalDetails patient={patient} />

                                    {/* Benefits Summary Section */}
                                    <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-2 border-b border-gray-300 pb-1">Benefits Summary</h2>
                                    <PatientBenefitsSummary patient={patient} />
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Modal for New Patient Form */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg z-10">
                        <h2 className="text-lg font-semibold mb-4">Add New Patient</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleAddPatient(); }}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={newPatient.firstname}
                                    onChange={handleNewPatientChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={newPatient.lastname}
                                    onChange={handleNewPatientChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={newPatient.email}
                                    onChange={handleNewPatientChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={newPatient.phone}
                                    onChange={handleNewPatientChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="mr-4 bg-gray-200 px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 px-4 py-2 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Add Patient
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
