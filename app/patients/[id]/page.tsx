'use client';

import { PaperClipIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function PatientDetails() {
    const supabase = createClient();
    const { id } = useParams(); // Using useParams to get dynamic route ID
    const [patient, setPatient] = useState(null);
    const [patientName, setPatientName] = useState(null);
    const [driverLicense, setDriverLicense] = useState(null);
    const [history, setHistory] = useState({ placements: [], insurance: [], medicalRecords: [] });

    useEffect(() => {
        async function fetchPatientData() {
            if (id) {
                // Fetch patient data from the 'patientinfo' table, including firstname and lastname in one query
                const { data: patientData, error: patientError } = await supabase
                    .from('patientinfo')
                    .select('firstname, lastname, age, dob, email, ssn, tribe, insurance, insurance_phonenumber, plantype, memberid, groupid')
                    .eq('patient_id', id)
                    .single();

                if (patientError) {
                    console.error('Error fetching patient:', patientError);
                } else {
                    setPatient(patientData);
                    
                    // Fetch related driver's license information
                    const { data: licenseData, error: licenseError } = await supabase
                        .from('patientinfo')
                        .select('dlnumber, issuedate, expirydate, icn, dd')
                        .eq('patient_id', id)
                        .single();

                    if (!licenseError) setDriverLicense(licenseData);

                    // Fetch additional history information
                    const { data: placementsData } = await supabase
                        .from('placement_details')
                        .select('*')
                        .eq('patient_id', id);

                    const { data: patientInsuranceData } = await supabase
                        .from('patientinfo')
                        .select('insurance, insurance_phonenumber, plantype, memberid, groupid')
                        .eq('patient_id', id);

                    setHistory({
                        placements: placementsData || [],
                        insurance: patientInsuranceData || [],
                    });
                }
            }
        }
        fetchPatientData();
    }, [id]);

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            {/* You can replace this with the patient's actual profile picture if available */}
                            <img
                                alt=""
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                className="h-12 w-12 rounded-full"
                            />
                        </div>
                        <div className="ml-4">
                            {/* Display patient's full name */}
                            <h3 className="text-base font-semibold leading-6 text-gray-900">
                                {patient.firstname} {patient.lastname}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {/* Placeholder link, replace with actual data if needed */}
                                <a href="#">{patient.username || patient.email}</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="ml-4 mt-4 flex flex-shrink-0">
                    <button
                        type="button"
                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => router.push(`/patients/edit/${id}`)}
                    >
                        <PhoneIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
                        <span>Schedule Placement</span>
                    </button>
                    <button
                        type="button"
                        className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => router.push(`/patients/edit/${id}`)}
                    >
                        <EnvelopeIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
                        <span>Edit Patient</span>
                    </button>
                </div>
            </div>
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                {/* Personal Details */}
                <div className="px-4 py-6 sm:px-6">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Patient Information</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Details about the patient.</p>
                </div>
                <div className="border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">Date of Birth</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{patient.dob}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">Email</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{patient.email || 'N/A'}</dd>
                        </div>
                    </dl>
                </div>

                {/* Identification (Driver's License) */}
                {driverLicense && (
                    <div className="border-t border-gray-100">
                        <div className="px-4 py-6 sm:px-6">
                            <h3 className="text-base font-semibold leading-7 text-gray-900">Driver's License Information</h3>
                        </div>
                        <div className="border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">DL Number</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{driverLicense.dl_number}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">Issue Date</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{driverLicense.issue_date}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-900">Expiration Date</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{driverLicense.expiration_date}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                )}

                {/* History */}
                <div className="border-t border-gray-100">
                    <div className="px-4 py-6 sm:px-6">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">Patient History</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Placements, insurance, medical records, etc.</p>
                    </div>
                    <div className="border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">Placements</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {history.placements.length ? history.placements.join(', ') : 'No placements found'}
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">Insurance</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {history.insurance.length ? history.insurance.join(', ') : 'No insurance records found'}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
        </div>
   </div>
    );
}
