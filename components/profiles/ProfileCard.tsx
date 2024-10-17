import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';
import { fetchIndividual, fetchDriversLicense, fetchRelatedRecords } from '../../utils/fetch/profiles';

const ProfileCard = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div
                className="flex w-full items-center justify-between space-x-6 p-6 cursor-pointer"
                onClick={toggleOpen}
            >
                <h3 className="truncate text-sm font-medium text-gray-900">{title}</h3>
                <span>{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && (
                <div className="p-6">
                    {children}
                </div>
            )}
        </li>
    );
};

// Main profile component
export default function ProfileDetails({ id }) {
    const [profile, setProfile] = useState(null); // Store fetched profile data
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error handling

    // Fetch profile data on component mount
    useEffect(() => {
        async function fetchData() {
            try {
                const individualData = await fetchIndividual(id);
                if (individualData.error) throw individualData.error;

                const driversLicenseData = await fetchDriversLicense(id);
                if (driversLicenseData.error) throw driversLicenseData.error;

                const relatedRecords = await fetchRelatedRecords(id);
                if (relatedRecords.error) throw relatedRecords.error;

                setProfile({
                    personalDetails: individualData.data,
                    driversLicense: driversLicenseData.data,
                    relatedRecords,
                });
                setLoading(false);
            } catch (err) {
                console.error("Error fetching profile data:", err);
                setError('Failed to load profile data.');
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!profile) {
        return <div>No profile data available.</div>;
    }

    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Personal Details Card */}
            <ProfileCard title="Personal Details">
                <div className="flex w-full items-center justify-between space-x-6">
                    <div className="flex-1 truncate">
                        <h3 className="text-lg font-medium text-gray-900">
                            {profile.personalDetails.first_name} {profile.personalDetails.last_name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">Role: {profile.personalDetails.role}</p>
                        <p className="mt-1 text-sm text-gray-500">DOB: {profile.personalDetails.date_of_birth}</p>
                        <p className="mt-1 text-sm text-gray-500">SSN: {profile.personalDetails.ssn}</p>
                    </div>
                    <img
                        alt="Profile"
                        src={profile.personalDetails.imageUrl}
                        className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                    />
                </div>
                <div className="mt-4 flex divide-x divide-gray-200">
                    <div className="flex w-0 flex-1">
                        <a
                            href={`mailto:${profile.personalDetails.email}`}
                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 py-4 text-sm font-semibold text-gray-900"
                        >
                            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                            Email
                        </a>
                    </div>
                    <div className="flex w-0 flex-1">
                        <a
                            href={`tel:${profile.personalDetails.telephone}`}
                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 py-4 text-sm font-semibold text-gray-900"
                        >
                            <PhoneIcon className="h-5 w-5 text-gray-400" />
                            Call
                        </a>
                    </div>
                </div>
            </ProfileCard>

            {/* Driver's License Card */}
            {profile.driversLicense && (
                <ProfileCard title="Driver's License">
                    <p className="text-sm text-gray-500">DL Number: {profile.driversLicense.dl_number}</p>
                    <p className="text-sm text-gray-500">Issue Date: {profile.driversLicense.issue_date}</p>
                    <p className="text-sm text-gray-500">Expiration Date: {profile.driversLicense.expiration_date}</p>
                    <p className="text-sm text-gray-500">
                        Address: {profile.driversLicense.address}, {profile.driversLicense.city}, {profile.driversLicense.state}, {profile.driversLicense.zip}
                    </p>
                </ProfileCard>
            )}
        </ul>
    );
}
