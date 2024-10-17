'use client';

import { useState, useEffect } from 'react';
import PlacementCalendar from '@/components/calendar/PlacementCalendar';
import { fetchPlacements } from '@/utils/fetch/placementDetails';
import { fetchPatients } from '@/utils/fetch/patientDetails';
import { fetchFacilities } from '@/utils/fetch/facilityDetails';
import { insertPlacement } from '@/utils/create';

export default function PlacementManager() {
    const [placements, setPlacements] = useState([]);
    const [patients, setPatients] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPlacementFormVisible, setNewPlacementFormVisible] = useState(false);
    const [newPlacementData, setNewPlacementData] = useState({
        patient_id: '',
        facility_id: '',
        start_date: '',
        end_date: ''
    });
    const [selectedPatient, setSelectedPatient] = useState('');
    const [month, setMonth] = useState(new Date());

    // Fetch placements, patients, and facilities
    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            try {
                const dataPlacements = await fetchPlacements();
                const dataPatients = await fetchPatients(); // Fetch all patients
                const dataFacilities = await fetchFacilities(); // Fetch all facilities
                setPlacements(dataPlacements);
                setPatients(dataPatients); // Update patient data state
                setFacilities(dataFacilities); // Update facility data state
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setLoading(false);
        };
        loadInitialData();
    }, []);

    // Form handlers
    const handleNewPlacementChange = (e) => {
        const { name, value } = e.target;
        setNewPlacementData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNewPlacementSubmit = async (e) => {
        e.preventDefault();
        try {
            await insertPlacement(newPlacementData);
            setNewPlacementFormVisible(false);
            setNewPlacementData({ patient_id: '', facility_id: '', start_date: '', end_date: '' });
            const updatedPlacements = await fetchPlacements();
            setPlacements(updatedPlacements); // Update the placements list
        } catch (error) {
            console.error("Failed to insert new placement:", error);
        }
    };

    const handlePatientChange = (event) => {
        setSelectedPatient(event.target.value);
    };

    const handleMonthChange = (event) => {
        const selectedMonth = new Date(event.target.value);
        setMonth(selectedMonth);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-semibold text-gray-900">Placement Manager</h1>
            <p className="mt-2 text-gray-600">Manage and view patient placements by date.</p>

            {/* Header Section with Stats and Buttons */}
            <div className="mt-6 flex justify-between items-center">
                {/* Patient Dropdown */}
                <div className="flex items-center space-x-2">
                    <label htmlFor="patient-select" className="text-sm font-medium text-gray-700">
                        Filter by Patient:
                    </label>
                    <select
                        id="patient-select"
                        name="patient"
                        value={selectedPatient}
                        onChange={handlePatientChange}
                        className="block w-48 rounded-md border-gray-300 py-1.5 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">All Patients</option>
                        {patients.map((patient) => (
                            <option key={patient.patient_id} value={patient.patient_id}>
                                {`${patient.firstname} ${patient.lastname}`}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Jump to Month */}
                <div className="flex items-center space-x-2">
                    <label htmlFor="month-select" className="text-sm font-medium text-gray-700">
                        Jump to Month:
                    </label>
                    <input
                        type="month"
                        id="month-select"
                        name="month"
                        value={month.toISOString().slice(0, 7)}
                        onChange={handleMonthChange}
                        className="block w-48 rounded-md border-gray-300 py-1.5 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                {/* New Placement Button */}
                <div className="flex items-center space-x-2">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => setNewPlacementFormVisible(true)}
                    >
                        New Placement
                    </button>
                </div>
            </div>

            {/* Calendar */}
            <div className="mt-8">
                <PlacementCalendar month={month} selectedPatient={selectedPatient} />
            </div>

            {/* New Placement Form Modal */}
            {newPlacementFormVisible && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Placement</h3>
                        <form onSubmit={handleNewPlacementSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Patient</label>
                                <select
                                    name="patient_id"
                                    value={newPlacementData.patient_id}
                                    onChange={handleNewPlacementChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                >
                                    <option value="">Select a patient</option>
                                    {patients.map((patient) => (
                                        <option key={patient.patient_id} value={patient.patient_id}>
                                            {`${patient.firstname} ${patient.lastname}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Facility</label>
                                <select
                                    name="facility_id"
                                    value={newPlacementData.facility_id}
                                    onChange={handleNewPlacementChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                >
                                    <option value="">Select a facility</option>
                                    {facilities.map((facility) => (
                                        <option key={facility.facility_id} value={facility.facility_id}>
                                            {facility.facility_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                <input
                                    type="date"
                                    name="start_date"
                                    value={newPlacementData.start_date}
                                    onChange={handleNewPlacementChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">End Date</label>
                                <input
                                    type="date"
                                    name="end_date"
                                    value={newPlacementData.end_date}
                                    onChange={handleNewPlacementChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="mr-4 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                                    onClick={() => setNewPlacementFormVisible(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Add Placement
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Placement List */}
            <div className="pt-11">
                <ul role="list" className="divide-y divide-gray-200">
                    {placements.map((placement) => (
                        <li key={placement.placement_id} className="py-5">
                            <div className="flex items-center justify-between gap-x-6">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                            Patient ID: {placement.patient_id} - Facility ID: {placement.facility_id}
                                        </p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                            Start Date: {new Date(placement.start_date).toLocaleDateString()}
                                        </p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                            End Date: {placement.end_date ? new Date(placement.end_date).toLocaleDateString() : 'Ongoing'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
