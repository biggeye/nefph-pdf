'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { MultiStepFormData } from '@/data/types/profiles';
import PersonalForm from './steps/PersonalForm';
import DLForm from './steps/DLForm';
import LogsForm from './steps/LogsForm';
import BanksForm from './steps/BanksForm';
import BusinessForm from './steps/BusinessForm';

const allTabs = ['personal', 'dl', 'logs', 'banks', 'business'] as const;
type Tab = typeof allTabs[number];

const tabs = allTabs.map((tab) => ({
    name: tab.charAt(0).toUpperCase() + tab.slice(1),
    key: tab,
    current: tab === 'personal',
}));

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function MultiTabForm() {
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
        personal: ['first_name', 'last_name'],
    };

    const validateFormData = () => {
        const errors: string[] = [];

        for (const tab of allTabs) {
            const fields = requiredFields[tab];
            if (fields) {
                for (const field of fields) {
                    const tabData = formData[tab] as Record<
                        string,
                        string | number | boolean | undefined
                    >;
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

            console.log('filteredFormData', filteredFormData);
            const response = await fetch('/api/profiles/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filteredFormData),
            });
            const result = await response.json();

            if (response.ok) {
                setSubmissionStatus({
                    success: true,
                    message: result.message || 'Profile created successfully.',
                });
            } else {
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
        <div className="p-4 bg-black min-h-screen text-green-500 font-mono">
            <div className="relative border-b border-green-900 pb-5 sm:pb-0">
                <div className="mt-3 flex justify-end md:absolute md:right-0 md:top-3 md:mt-0">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="ml-3 inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>

            {submissionStatus && (
                <div
                    className={`${submissionStatus.success ? 'text-green-400' : 'text-red-400'
                        } mt-4`}
                >
                    {submissionStatus.message}
                </div>
            )}

            <div className="mt-4">
                <div className="grid grid-cols-1 sm:hidden">
                    <select
                        defaultValue={tabs.find((tab) => tab.key === activeTab)?.name}
                        aria-label="Select a tab"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-black py-2 pl-3 pr-8 text-base text-green-500 outline outline-1 -outline-offset-1 outline-green-900 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600"
                        onChange={(e) => handleTabChange(e.target.value as Tab)}
                    >
                        {tabs.map((tab) => (
                            <option key={tab.key} value={tab.key}>
                                {tab.name}
                            </option>
                        ))}
                    </select>
                    <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-green-500"
                    />
                </div>
                <div className="hidden sm:block">
                    <nav className="-mb-px flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => handleTabChange(tab.key)}
                                aria-current={tab.key === activeTab ? 'page' : undefined}
                                className={classNames(
                                    tab.key === activeTab
                                        ? 'border-green-500 text-green-500'
                                        : 'border-transparent text-green-400 hover:border-green-500 hover:text-white',
                                    'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium'
                                )}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
                <div className="text-red-500">
                    {validationErrors.map((error, index) => (
                        <div key={index}>
                            {error}
                        </div>
                    ))}
                </div>
            )}

            {/* Tab Content */}
            <div className="mt-4">
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
        </div>
    );
}
