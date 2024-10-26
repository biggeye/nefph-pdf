'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Personal, DL, Logs, Banks } from '@/components/profiles/ProfileTabs';
import { fetchProfile, fetchLogs, fetchDL, fetchBanks } from '@/utils/profiles';
import { updateProfile, updateDL, updateLogs, updateBanks } from '@/utils/profiles';  // Import update utilities
import MediaGallery from '@/components/assets/MediaGallery';
import MediaUploader from '@/components/assets/MediaUploader';

interface UserData {
    personal: object | null;
    dl: object | null;
    logs: object | null;
    banks: object | null;
    assets?: Asset[];  // Optional, as it may not be available initially
}

interface Asset {
    url: string;
    type: string;
    description?: string;
}

export default function ProfileDetail() {
    const { id: cpn_id } = useParams();
    const [currentTab, setCurrentTab] = useState<string>('personal');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [profile, setProfile] = useState<UserData | null>(null);
    const [editableProfile, setEditableProfile] = useState<UserData | null>(null);  // Store editable data
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const tabs = [
        { name: 'Personal', id: 'personal' },
        { name: 'DL', id: 'dl' },
        { name: 'Logs', id: 'logs' },
        { name: 'Banks', id: 'banks' },
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

                const userData = {
                    personal: profileResponse.data,
                    logs: logsResponse.data,
                    dl: dlResponse.data,
                    banks: banksResponse.data,
                    assets: [],
                };

                setProfile(userData);
                setEditableProfile(userData);  // Initialize editable data with fetched data
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
        if (!isEditing) {
            setEditableProfile(profile);  // Reset editable profile data when exiting edit mode
        }
    };

    const handleSave = async () => {
        if (!editableProfile) return;

        try {
            if (currentTab === 'personal') {
                const updatedPersonalData = {
                    first_name: editableProfile.personal.first_name,
                    last_name: editableProfile.personal.last_name,
                    email: editableProfile.personal.email,
                    phone: editableProfile.personal.phone,
                    address: editableProfile.personal.address,
                    city: editableProfile.personal.city,
                    state: editableProfile.personal.state,
                    zip: editableProfile.personal.zip,
                    dob: editableProfile.personal.dob,
                    ssn: editableProfile.personal.ssn,
                };

                const { data, error } = await updateProfile(cpn_id, updatedPersonalData);
                if (error) throw new Error(error);
                console.log('Profile updated successfully:', data);
            }

            /* Add logic for-
            DL:
            
            Logs:
            
            Banks: 

            Business:


            */
            setProfile(editableProfile);
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving profile data:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditableProfile(profile);  
    };

    const handleMediaUpload = (newFileUrl: string) => {
        setAssets([...assets, { url: newFileUrl, type: 'image' }]);
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
            default:
                return null;
        }
    }

    return (
        <div className="p-4 bg-black min-h-screen text-green-500 font-mono">
            <div className="relative border-b border-green-900 pb-5 sm:pb-0">
                <div className="md:flex md:items-center md:justify-between">
                    {/*insert buttons for cycling through profiles*/}
                    <button
                        onClick={toggleEditMode}
                        className="mt-2 text-sm font-medium text-green-400 hover:text-white"
                    >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>
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
