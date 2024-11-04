import { PaperClipIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { motion } from 'framer-motion';

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


interface PersonalData {
    first_name: string;
    last_name: string;
    dob: string;
    ssn: string;
    address: string;
    city: string;
    state: string;
    zip: string;
}

interface DriverLicenseData {
    dl_number?: string;
    issue_date?: string;
    expiration_date?: string;
    state?: string;
    gender?: string;
    eye_color?: string;
    hair_color?: string;
    height?: string;
    weight?: string;
    dd?: string;
    icn?: string;
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

interface EditableProps<T> {
    data: T;
    isEditing: boolean;
    setEditableData: React.Dispatch<React.SetStateAction<{
        personal?: PersonalData;
        dl?: DriverLicenseData;
        logs?: LogData[];
        banks?: BankData[];
    }>>;
}



export function Personal({ data, isEditing, setEditableData }: EditableProps<PersonalData>) {
    if (!data) {
        return <p className="text-red-500">No personal information available.</p>;
    }

    const handleChange = (field: keyof PersonalData, value: string) => {
        setEditableData((prevData) => ({
            ...prevData,
            personal: { ...prevData.personal, [field]: value },
        }));
    };

    const transitionVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            className="bg-black text-green-500 font-mono p-6 rounded-md"
            initial="hidden"
            animate="visible"
            variants={transitionVariants}
            transition={{ duration: 0.4 }}
        >
            <div className="px-4 sm:px-0">
                <h3 className="text-lg font-bold text-green-500">Personal Information</h3>
            </div>
            <div className="mt-6">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name block */}
                    <div className="border-t border-green-900 px-4 py-6 md:col-span-2">
                        <dt className="text-sm font-bold">Name</dt>
                        {isEditing ? (
                            <>
                                <input
                                    className="mt-1 block w-full bg-black text-white ansi-box-cursor"
                                    defaultValue={data.first_name}
                                    onChange={(e) => handleChange('first_name', e.target.value)}
                                    placeholder="First Name"
                                />
                                <input
                                    className="mt-1 block w-full bg-black text-white ansi-box-cursor"
                                    defaultValue={data.last_name}
                                    onChange={(e) => handleChange('last_name', e.target.value)}
                                    placeholder="Last Name"
                                />
                            </>
                        ) : (
                            <dd className="mt-1 text-white block">
                                {data.first_name} {data.last_name}
                            </dd>
                        )}
                    </div>

                    {/* DOB and SSN block */}
                    <div className="border-t border-green-900 px-4 py-6 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <dt className="text-sm font-bold">Date of Birth</dt>
                            {isEditing ? (
                                <input
                                    className="mt-1 block w-full bg-black text-white ansi-box-cursor"
                                    defaultValue={data.dob}
                                    onChange={(e) => handleChange('dob', e.target.value)}
                                />
                            ) : (
                                <dd className="mt-1 text-white">{data.dob}</dd>
                            )}
                        </div>
                        <div>
                            <dt className="text-sm font-bold">SSN</dt>
                            {isEditing ? (
                                <input
                                    className="mt-1 block w-full bg-black text-white ansi-box-cursor"
                                    defaultValue={data.ssn}
                                    onChange={(e) => handleChange('ssn', e.target.value)}
                                />
                            ) : (
                                <dd className="mt-1 text-white">{data.ssn}</dd>
                            )}
                        </div>
                    </div>

                    {/* Address block */}
                    <div className="border-t border-green-900 px-4 py-6 md:col-span-2">
                        <dt className="text-sm font-bold">Address</dt>
                        {isEditing ? (
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                <input
                                    className="mt-1 block w-full col-span-4 sm:col-span-4 bg-black text-white ansi-box-cursor"
                                    defaultValue={data.address}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                    placeholder="Address"
                                />
                                <input
                                    className="mt-1 block w-full col-span-2 sm:col-span-2 bg-black text-white ansi-box-cursor"
                                    defaultValue={data.city}
                                    onChange={(e) => handleChange('city', e.target.value)}
                                    placeholder="City"
                                />
                                <input
                                    className="mt-1 block w-full col-span-1 sm:col-span-1 bg-black text-white ansi-box-cursor"
                                    defaultValue={data.state}
                                    onChange={(e) => handleChange('state', e.target.value)}
                                    placeholder="State"
                                    maxLength={2}
                                />
                                <input
                                    className="mt-1 block w-full col-span-1 sm:col-span-1 bg-black text-white ansi-box-cursor"
                                    defaultValue={data.zip}
                                    onChange={(e) => handleChange('zip', e.target.value)}
                                    placeholder="Zip"
                                />
                            </div>
                        ) : (
                            <dd className="mt-1 text-white block">
                                {data.address}, {data.city}, {data.state} {data.zip}
                            </dd>
                        )}
                    </div>
                </dl>
            </div>
        </motion.div>
    );
}

export function DL({ data, isEditing, setEditableData }: EditableProps<DriverLicenseData>) {
    if (!data) {
        return <p className="text-red-500">No driver's license information available.</p>;
    }

    const handleChange = (field: keyof DriverLicenseData, value: string) => {
        setEditableData((prevData) => ({
            ...prevData,
            dl: { ...prevData.dl, [field]: value },
        }));
    };

    return (
        <div className="bg-black text-green-500 font-mono p-6 rounded-md">
            <div className="px-4 sm:px-0">
                <h3 className="text-lg font-bold text-green-500">Driver's License Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-green-400">Details of the driver's license.</p>
            </div>
            <div className="mt-6 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <dt className="text-sm font-bold">License Number</dt>
                        {isEditing ? (
                            <input
                                className="mt-1 block w-full bg-black text-white"
                                defaultValue={data.dl_number || ''}
                                onChange={(e) => handleChange('dl_number', e.target.value)}
                            />
                        ) : (
                            <dd className="mt-1 text-white">{data.dl_number || 'N/A'}</dd>
                        )}
                    </div>
                    <div>
                        <dt className="text-sm font-bold">Issue Date</dt>
                        {isEditing ? (
                            <input
                                className="mt-1 block w-full bg-black text-white"
                                defaultValue={data.issue_date || ''}
                                onChange={(e) => handleChange('issue_date', e.target.value)}
                            />
                        ) : (
                            <dd className="mt-1 text-white">{data.issue_date || 'N/A'}</dd>
                        )}
                    </div>
                    <div>
                        <dt className="text-sm font-bold">Expiration Date</dt>
                        {isEditing ? (
                            <input
                                className="mt-1 block w-full bg-black text-white"
                                defaultValue={data.expiration_date || ''}
                                onChange={(e) => handleChange('expiration_date', e.target.value)}
                            />
                        ) : (
                            <dd className="mt-1 text-white">{data.expiration_date || 'N/A'}</dd>
                        )}
                    </div>
                    <div>
                        <dt className="text-sm font-bold">State of Issue</dt>
                        {isEditing ? (
                            <input
                                className="mt-1 block w-full bg-black text-white"
                                defaultValue={data.state || ''}
                                onChange={(e) => handleChange('state', e.target.value)}
                            />
                        ) : (
                            <dd className="mt-1 text-white">{data.state || 'N/A'}</dd>
                        )}
                    </div>
                </div>

                <hr className="border-green-900" />

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
                    <div>
                        <dt className="text-sm font-bold">Gender</dt>
                        {isEditing ? (
                            <input
                                className="mt-1 block w-full bg-black text-white"
                                defaultValue={data.gender || ''}
                                onChange={(e) => handleChange('gender', e.target.value)}
                            />
                        ) : (
                            <dd className="mt-1 text-white">{data.gender || 'N/A'}</dd>
                        )}
                    </div>
                    <div>
                        <dt className="text-sm font-bold">Eye Color</dt>
                        {isEditing ? (
                            <input
                                className="mt-1 block w-full bg-black text-white"
                                defaultValue={data.eye_color || ''}
                                onChange={(e) => handleChange('eye_color', e.target.value)}
                            />
                        ) : (
                            <dd className="mt-1 text-white">{data.eye_color || 'N/A'}</dd>
                        )}
                    </div>
                    <div>
                        <dt className="text-sm font-bold">Hair Color</dt>
                        {isEditing ? (
                            <input
                                className="mt-1 block w-full bg-black text-white"
                                defaultValue={data.hair_color || ''}
                                onChange={(e) => handleChange('hair_color', e.target.value)}
                            />
                        ) : (
                            <dd className="mt-1 text-white">{data.hair_color || 'N/A'}</dd>
                        )}
                    </div>
                    <div>
                        <dt className="text-sm font-bold">Height</dt>
                        {isEditing ? (
                            <input
                                className="mt-1 block w-full bg-black text-white"
                                defaultValue={data.height || ''}
                                onChange={(e) => handleChange('height', e.target.value)}
                            />
                        ) : (
                            <dd className="mt-1 text-white">{data.height || 'N/A'}</dd>
                        )}
                    </div>
                    <div>
                        <dt className="text-sm font-bold">Weight</dt>
                        {isEditing ? (
                            <input
                                className="mt-1 block w-full bg-black text-white"
                                defaultValue={data.weight || ''}
                                onChange={(e) => handleChange('weight', e.target.value)}
                            />
                        ) : (
                            <dd className="mt-1 text-white">{data.weight || 'N/A'}</dd>
                        )}
                    </div>
                </div>

                <hr className="border-green-900" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <dt className="text-sm font-bold">DD</dt>
                        {isEditing ? (
                            <input
                                className="mt-1 block w-full bg-black text-white"
                                defaultValue={data.dd || ''}
                                onChange={(e) => handleChange('dd', e.target.value)}
                            />
                        ) : (
                            <dd className="mt-1 text-white">{data.dd || 'N/A'}</dd>
                        )}
                    </div>
                    <div>
                        <dt className="text-sm font-bold">ICN</dt>
                        {isEditing ? (
                            <input
                                className="mt-1 block w-full bg-black text-white"
                                defaultValue={data.icn || ''}
                                onChange={(e) => handleChange('icn', e.target.value)}
                            />
                        ) : (
                            <dd className="mt-1 text-white">{data.icn || 'N/A'}</dd>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


export function Logs({ data, isEditing, setEditableData }: EditableProps<LogData[]>) {
    const handleChange = (logId: number, field: keyof LogData, value: string) => {
        setEditableData((prevData) => ({
            ...prevData,
            logs: prevData.logs?.map((log) =>
                log.log_id === logId ? { ...log, [field]: value } : log
            ),
        }));
    };

    return (
        <div className="bg-black text-green-500 font-mono p-6 rounded-md">
            <div className="px-4 sm:px-0">
                <h3 className="text-lg font-bold text-green-500">Activity Logs</h3>
                <p className="mt-1 max-w-2xl text-sm text-green-400">Logs of recent activities.</p>
            </div>
            <div className="mt-6">
                {data.length > 0 ? (
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {data.map((log) => (
                            <div key={log.log_id} className="border-t border-green-900 px-4 py-6 sm:col-span-1 sm:px-0">
                                <dt className="text-sm font-bold">Site</dt>
                                {isEditing ? (
                                    <input
                                        className="mt-1 block w-full bg-black text-white"
                                        defaultValue={log.site}
                                        onChange={(e) => handleChange(log.log_id, 'site', e.target.value)}
                                    />
                                ) : (
                                    <dd className="mt-1 text-white">{log.site}</dd>
                                )}
                                {/* Continue similarly for other fields */}
                         

                                <dt className="text-sm font-bold">Username</dt>
                                {isEditing ? (
                                    <input
                                        className="mt-1 block w-full bg-black text-white"
                                        defaultValue={log.username}
                                        onChange={(e) => handleChange(log.log_id, 'username', e.target.value)}
                                    />
                                ) : (
                                    <dd className="mt-1 text-white">{log.username}</dd>
                                )}

                                <dt className="text-sm font-bold">Password</dt>
                                {isEditing ? (
                                    <input
                                        className="mt-1 block w-full bg-black text-white"
                                        defaultValue={log.password}
                                        onChange={(e) => handleChange(log.log_id, 'password', e.target.value)}
                                    />
                                ) : (
                                    <dd className="mt-1 text-white">{log.password}</dd>
                                )}

                                {log.pin && (
                                    <>
                                        <dt className="text-sm font-bold">PIN</dt>
                                        {isEditing ? (
                                            <input
                                                className="mt-1 block w-full bg-black text-white"
                                                defaultValue={log.pin}
                                                onChange={(e) => handleChange(log.log_id, 'pin', e.target.value)}
                                            />
                                        ) : (
                                            <dd className="mt-1 text-white">{log.pin}</dd>
                                        )}
                                    </>
                                )}

                                {log.security_question && (
                                    <>
                                        <dt className="text-sm font-bold">Security Question</dt>
                                        {isEditing ? (
                                            <input
                                                className="mt-1 block w-full bg-black text-white"
                                                defaultValue={log.security_question}
                                                onChange={(e) => handleChange(log.log_id, 'security_question', e.target.value)}
                                            />
                                        ) : (
                                            <dd className="mt-1 text-white">{log.security_question}</dd>
                                        )}
                                        {log.answer && (
                                            <>
                                                <dt className="text-sm font-bold">Answer</dt>
                                                {isEditing ? (
                                                    <input
                                                        className="mt-1 block w-full bg-black text-white"
                                                        defaultValue={log.answer}
                                                        onChange={(e) => handleChange(log.log_id, 'answer', e.target.value)}
                                                    />
                                                ) : (
                                                    <dd className="mt-1 text-white">{log.answer}</dd>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </dl>
                ) : (
                    <p className="text-green-400">No logs available.</p>
                )}
            </div>
        </div>
    );
}

export function Banks({ data, isEditing, setEditableData }: EditableProps<BankData[]>) {
    const handleChange = (index: number, field: keyof BankData, value: string) => {
        setEditableData((prevData) => ({
            ...prevData,
            banks: prevData.banks?.map((bank, i) =>
                i === index ? { ...bank, [field]: value } : bank
            ),
        }));
    };

    return (
        <div className="bg-black text-green-500 font-mono p-6 rounded-md">
            <div className="px-4 sm:px-0">
                <h3 className="text-lg font-bold text-green-500">Bank Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-green-400">Bank account details for payroll.</p>
            </div>
            <div className="mt-6">
                {data.length > 0 ? (
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {data.map((bank, index) => (
                            <div key={index} className="border-t border-green-900 px-4 py-6 sm:col-span-1 sm:px-0">
                                <dt className="text-sm font-bold">Bank Name</dt>
                                {isEditing ? (
                                    <input
                                        className="mt-1 block w-full bg-black text-white"
                                        defaultValue={bank.bank_name}
                                        onChange={(e) => handleChange(index, 'bank_name', e.target.value)}
                                    />
                                ) : (
                                    <dd className="mt-1 text-white">{bank.bank_name}</dd>
                                )}
                                {/* Continue similarly for other fields */}

                                <dt className="text-sm font-bold">Account Number</dt>
                                {isEditing ? (
                                    <input
                                        className="mt-1 block w-full bg-black text-white"
                                        defaultValue={bank.account_number}
                                        onChange={(e) => handleChange(index, 'account_number', e.target.value)}
                                    />
                                ) : (
                                    <dd className="mt-1 text-white">{bank.account_number}</dd>
                                )}

                                <dt className="text-sm font-bold">Routing Number</dt>
                                {isEditing ? (
                                    <input
                                        className="mt-1 block w-full bg-black text-white"
                                        defaultValue={bank.routing_number}
                                        onChange={(e) => handleChange(index, 'routing_number', e.target.value)}
                                    />
                                ) : (
                                    <dd className="mt-1 text-white">{bank.routing_number}</dd>
                                )}

                                <dt className="text-sm font-bold">Account Type</dt>
                                {isEditing ? (
                                    <input
                                        className="mt-1 block w-full bg-black text-white"
                                        defaultValue={bank.account_type}
                                        onChange={(e) => handleChange(index, 'account_type', e.target.value)}
                                    />
                                ) : (
                                    <dd className="mt-1 text-white">{bank.account_type}</dd>
                                )}
                            </div>
                        ))}
                    </dl>
                ) : (
                    <p className="text-green-400">No bank information available.</p>
                )}
            </div>
        </div>
    );
}

export function Business({ data, isEditing, setEditableData }: EditableProps<BusinessData>) {
    if (!data) {
        return <p className="text-red-500">No business information available.</p>;
    }

    const handleChange = (field: keyof BusinessData, value: string) => {
        setEditableData((prevData) => ({
            ...prevData,
            business: { ...prevData.business, [field]: value },
        }));
    };

    return (
        <div className="bg-black text-green-500 font-mono p-6 rounded-md">
            <div className="px-4 sm:px-0">
                <h3 className="text-lg font-bold text-green-500">Business Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-green-400">Details about the registered business entity.</p>
            </div>
            <div className="mt-6 space-y-8">
                {/* Business Name Block */}
                <div>
                    <dt className="text-sm font-bold">Business Name</dt>
                    {isEditing ? (
                        <input
                            className="mt-1 block w-full bg-black text-white"
                            defaultValue={data.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                        />
                    ) : (
                        <dd className="mt-1 text-white">{data.name}</dd>
                    )}
                </div>

                {/* Continue similarly for other fields */}

                <div>
                    <dt className="text-sm font-bold">DBA</dt>
                    {isEditing ? (
                        <input
                            className="mt-1 block w-full bg-black text-white"
                            defaultValue={data.dba}
                            onChange={(e) => handleChange('dba', e.target.value)}
                        />
                    ) : (
                        <dd className="mt-1 text-white">{data.dba}</dd>
                    )}
                </div>

                {/* EIN */}
                <div>
                    <dt className="text-sm font-bold">EIN</dt>
                    {isEditing ? (
                        <input
                            className="mt-1 block w-full bg-black text-white"
                            defaultValue={data.ein}
                            onChange={(e) => handleChange('ein', e.target.value)}
                        />
                    ) : (
                        <dd className="mt-1 text-white">{data.ein}</dd>
                    )}
                </div>

                {/* Additional fields like formation_date, address, etc., would follow similarly */}
            </div>
        </div>
    );
}
