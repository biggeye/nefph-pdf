// /components/profiles/MultiTabForm.tsx

'use client';

import { useState } from 'react';
import {
    StepDataMap,
    MultiStepFormData,
    Profile,
    Logs,
    DL,
    Banks,
    Business,
} from '@/data/types/profiles';
import PersonalForm from './steps/PersonalForm';
import DLForm from './steps/DLForm';
import LogsForm from './steps/LogsForm';
import BanksForm from './steps/BanksForm';
import BusinessForm from './steps/BusinessForm';


export default function MultiTabForm() {
    const allTabs = ['personal', 'dl', 'logs', 'banks', 'business'] as const;
    type Tab = typeof allTabs[number];

    const [activeTab, setActiveTab] = useState<Tab>('personal');
    const [formData, setFormData] = useState<MultiStepFormData>({
        personal: {},
        dl: {},
        logs: [],
        banks: [],
        business: {},
    });

    const handleTabChange = (tab: Tab) => {
        setActiveTab(tab);
    };

    const handleFormDataChange = <K extends keyof MultiStepFormData>(
        key: K,
        data: MultiStepFormData[K]
    ) => {
        setFormData((prev) => ({
            ...prev,
            [key]: data,
        }));
    };

    const [submissionStatus, setSubmissionStatus] = useState<{
        success: boolean;
        message: string;
    } | null>(null);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const requiredFields: { [key in Tab]?: string[] } = {
        personal: ['first_name', 'last_name'], // Example required fields for personal tab
        // dl: ['licenseNumber'], // Example required fields for dl tab
        // Add required fields for other tabs as needed
    };

    const validateFormData = () => {
        const errors: string[] = [];

        for (const tab of allTabs) {
            const fields = requiredFields[tab];
            if (fields) {
                for (const field of fields) {
                    const tabData = formData[tab] as Record<string, any>;
                    if (!tabData[field]) {
                        errors.push(`Field ${field} is required in ${tab} tab.`);
                    }
                }
            }
        }

        setValidationErrors(errors);
        return errors.length === 0;
    };

    const handleSave = async () => {
        if (!validateFormData()) {
            return;
        }

        try {
            const filteredFormData = Object.fromEntries(
                Object.entries(formData).filter(([key, value]) => {
                    if (Array.isArray(value)) {
                        return value.length > 0;
                    }
                    return Object.keys(value).length > 0;
                })
            );

            console.log("filteredFormData", filteredFormData);
            const response = await fetch('/api/profiles/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filteredFormData),
            });
            const result = await response.json();

            if (response.ok) {
                // Display success message to the user
                setSubmissionStatus({
                    success: true,
                    message: result.message || 'Profile created successfully.',
                });
            } else {
                // Handle error
                console.error('Failed to create profile:', result.error);
                setSubmissionStatus({
                    success: false,
                    message: result.error || 'Failed to create profile.',
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmissionStatus({
                success: false,
                message: 'An unexpected error occurred',
            });
        }
    };

    const handleCancel = () => {
        // Reset form data or navigate away
        setFormData({
            personal: {},
            dl: {},
            logs: [],
            banks: [],
            business: {},
        });
        setActiveTab('personal');
        setSubmissionStatus(null);
        setValidationErrors([]);
    };

    return (
        <div>
            {submissionStatus ? (
                <div
                    className={
                        submissionStatus.success ? 'success-message' : 'error-message'
                    }
                >
                    {submissionStatus.message}
                </div>
            ) : (
                <>
                    {/* Tab Navigation */}
                    <div className="tab-navigation">
                        {allTabs.map((tab) => (
                            <button
                                key={tab}
                                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => handleTabChange(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Validation Errors */}
                    {validationErrors.length > 0 && (
                        <div className="error-messages">
                            {validationErrors.map((error, index) => (
                                <div key={index} className="error-message">
                                    {error}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tab Content */}
                    <div className="tab-content">
                        {activeTab === 'personal' && (
                            <PersonalForm
                                data={formData.personal}
                                onDataChange={(data) => handleFormDataChange('personal', data)}
                            />
                        )}
                        {activeTab === 'dl' && (
                            <DLForm
                                data={formData.dl}
                                onDataChange={(data) => handleFormDataChange('dl', data)}
                            />
                        )}
                        {activeTab === 'logs' && (
                            <LogsForm
                                data={formData.logs}
                                onDataChange={(data) => handleFormDataChange('logs', data)}
                            />
                        )}
                        {activeTab === 'banks' && (
                            <BanksForm
                                data={formData.banks}
                                onDataChange={(data) => handleFormDataChange('banks', data)}
                            />
                        )}
                        {activeTab === 'business' && (
                            <BusinessForm
                                data={formData.business}
                                onDataChange={(data) =>
                                    handleFormDataChange('business', data)
                                }
                            />
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="form-actions">
                        <button className="save-button" onClick={handleSave}>
                            Save
                        </button>
                        <button className="cancel-button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
