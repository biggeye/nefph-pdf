'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Personal, DL, Logs, Banks, Business } from '@/components/profiles/ProfileTabs';
import {
    fetchProfile,
    fetchLogs,
    fetchDL,
    fetchBanks,
    fetchBusiness,
    updateProfile,
    updateDL,
    updateLogs,
    updateBanks,
    updateBusiness
} from '@/utils/profiles';
import MediaGallery from '@/components/assets/MediaGallery';
import MediaUploader from '@/components/assets/MediaUploader';

interface PersonalData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    dob: string;
    ssn: string;
}

interface DLData {
    dl_number: string;
    issue_date: string;
    expiration_date: string;
    state: string;
    gender: string;
    eye_color: string;
    hair_color: string;
    height: string;
    weight: string;
    dd: string;
    icn: string;
}

interface LogData {
    log_id: number;
    site: string;
    username: string;
    password: string;
    pin?: string;
    security_question?: string;
    answer?: string;
}

interface BankData {
    bank_name: string;
    account_number: string;
    routing_number: string;
    account_type: string;
}

interface BusinessData {
    id: number;
    created_at: string;
    cpn_id: string;
    name: string;
    dba: string;
    ein: string;
    formation_date?: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    type?: string;
    payroll_provider?: string;
}

interface Asset {
    url: string;
    type: string;
    description?: string;
}

interface UserData {
    personal: PersonalData | null;
    dl: DLData | null;
    logs: LogData[] | null;
    banks: BankData[] | null;
    business: BusinessData | null;
    assets?: Asset[];
}

export default function ProfileDetail() {
    const { id: cpn_id } = useParams<{ id: string }>();
    const [currentTab, setCurrentTab] = useState<'personal' | 'dl' | 'logs' | 'banks' | 'business'>('personal');
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<UserData | null>(null);
    const [editableProfile, setEditableProfile] = useState<UserData | null>(null);
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);

    const tabs = [
        { name: 'Personal', id: 'personal' as const },
        { name: 'DL', id: 'dl' as const },
        { name: 'Logs', id: 'logs' as const },
        { name: 'Banks', id: 'banks' as const },
        { name: 'Business', id: 'business' as const },
    ];

    useEffect(() => {
        async function fetchData() {
            if (!cpn_id) {
                console.error('CPN ID is missing');
                return;
            }

            try {
                const profileResponse = await fetchProfile(cpn_id);
                const logsResponse = await fetchLogs(cpn_id);
                const dlResponse = await fetchDL(cpn_id);
                const banksResponse = await fetchBanks(cpn_id);
                const businessResponse = await fetchBusiness(cpn_id);

                const userData: UserData = {
                    personal: profileResponse?.data || null,
                    logs: logsResponse?.data || null,
                    dl: dlResponse?.data || null,
                    banks: banksResponse?.data || null,
                    business: businessResponse?.data || null,
                    assets: [],
                };

                setProfile(userData);
                setEditableProfile(userData);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [cpn_id]);

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        if (!isEditing && profile) {
            setEditableProfile({ ...profile });
        }
    };

    const handleSave = async () => {
        if (!editableProfile || !cpn_id) return;

        try {
            let updateResponse;

            switch (currentTab) {
                case 'personal':
                    if (editableProfile.personal) {
                        updateResponse = await updateProfile(cpn_id, editableProfile.personal);
                    }
                    break;
                case 'dl':
                    if (editableProfile.dl) {
                        updateResponse = await updateDL(cpn_id, editableProfile.dl);
                    }
                    break;
                case 'logs':
                    if (editableProfile.logs) {
                        // Assuming the third argument for logs is a specific identifier or additional data required
                        updateResponse = await updateLogs(cpn_id, editableProfile.logs, /* thirdArgument */);
                    }
                    break;
                case 'banks':
                    if (editableProfile.banks) {
                        // Assuming the third argument for banks is a specific identifier or additional data required
                        updateResponse = await updateBanks(cpn_id, editableProfile.banks, /* thirdArgument */);
                    }
                    break;
                case 'business':
                    if (editableProfile.business) {
                        updateResponse = await updateBusiness(cpn_id, editableProfile.business);
                    }
                    break;
                default:
                    console.warn('Invalid tab selection');
                    return;
            }

            // Check for error in response and log if any
            if (updateResponse?.error) {
                throw new Error(updateResponse.error);
            }

            // Update the profile state with the edited data if successful
            setProfile(editableProfile);
            setIsEditing(false);
            console.log(`Profile updated successfully for ${currentTab} tab.`);

        } catch (error) {
            console.error('Error saving profile data:', error);
        }
    };


    const handleCancel = () => {
        setIsEditing(false);
        setEditableProfile(profile);
    };

    const handleMediaUpload = (newFileUrl: string) => {
        setAssets((prevAssets) => [...prevAssets, { url: newFileUrl, type: 'image' }]);
    };

    function renderTabContent() {
        if (loading) {
            return <p className="text-green-400">Loading...</p>;
        }

        if (!editableProfile) {
            return <p className="text-red-500">No profile data available.</p>;
        }

        switch (currentTab) {
            case 'personal':
                return <Personal data={editableProfile.personal} isEditing={isEditing} setEditableData={setEditableProfile} />;
            case 'dl':
                return <DL data={editableProfile.dl} isEditing={isEditing} setEditableData={setEditableProfile} />;
            case 'logs':
                return <Logs data={editableProfile.logs} isEditing={isEditing} setEditableData={setEditableProfile} />;
            case 'banks':
                return <Banks data={editableProfile.banks} isEditing={isEditing} setEditableData={setEditableProfile} />;
            case 'business':
                return <Business data={editableProfile.business} isEditing={isEditing} setEditableData={setEditableProfile} />;
            default:
                return null;
        }
    }

    return (
        <div className="p-4 bg-black min-h-screen text-green-500 font-mono">
            <div className="relative border-b border-green-900 pb-5 sm:pb-0">
                <button
                    onClick={toggleEditMode}
                    className="mt-2 text-sm font-medium text-green-400 hover:text-white"
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
                <div className="mt-4">
                    <nav className="-mb-px flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setCurrentTab(tab.id)}
                                className={`whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium ${currentTab === tab.id
                                    ? 'border-green-500 text-green-500'
                                    : 'border-transparent text-green-400 hover:border-green-500 hover:text-white'
                                    }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="mt-6">
                {isEditing ? (
                    <>
                        <MediaUploader cpnId={cpn_id} onUpload={handleMediaUpload} />
                        {renderTabContent()}
                        <div className="mt-4 flex space-x-4">
                            <button
                                onClick={handleSave}
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <MediaGallery assets={assets} />
                        {renderTabContent()}
                    </>
                )}
            </div>
        </div>
    );
}
