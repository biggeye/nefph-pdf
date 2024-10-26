import { PaperClipIcon } from '@heroicons/react/20/solid';
export function Personal({ data, isEditing, setEditableData }) {
    if (!data) {
        return <p className="text-red-500">No personal information available.</p>;
    }

    const handleChange = (field, value) => {
        setEditableData((prevData) => ({
            ...prevData,
            personal: { ...prevData.personal, [field]: value },
        }));
    };

    return (
        <div className="bg-black text-green-500 font-mono p-6 rounded-md">
            <div className="px-4 sm:px-0">
                <h3 className="text-lg font-bold text-green-500">Personal Information</h3>
            </div>
            <div className="mt-6">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="border-t border-green-900 px-4 py-6 sm:col-span-1 sm:px-0">
                        <dt className="text-sm font-bold">First Name</dt>
                        {isEditing ? (
                            <input
                                className="mt-1 block w-full bg-black text-white ansi-box-cursor"
                                defaultValue={data.first_name}
                                onChange={(e) => handleChange('first_name', e.target.value)}
                            />
                        ) : (
                            <dd className="mt-1 text-white">{data.first_name}</dd>
                        )}

                        <dt className="text-sm font-bold">Last Name</dt>
                        {isEditing ? (
                            <input
                                className="mt-1 block w-full bg-black text-white ansi-box-cursor"
                                defaultValue={data.last_name}
                                onChange={(e) => handleChange('last_name', e.target.value)}
                            />
                        ) : (
                            <dd className="mt-1 text-white">{data.last_name}</dd>
                        )}

                        <dt className="text-sm font-bold">Date of Birth</dt>
                        {isEditing ? (
                            <input
                                className="mt-1 block w-full bg-black text-white ansi-box-cursor"
                                defaultValue={data.dob}
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                        ) : (
                            <dd className="mt-1 text-white">{data.email}</dd>
                        )}

                        <dt className="text-sm font-bold">SSN</dt>
                        {isEditing ? (
                            <input
                                className="mt-1 block w-full bg-black text-white ansi-box-cursor"
                                defaultValue={data.ssn}
                                onChange={(e) => handleChange('phone', e.target.value)}
                            />
                        ) : (
                            <dd className="mt-1 text-white">{data.phone}</dd>
                        )}
                        <dt className="text-sm font-bold">Address</dt>
                        {isEditing ? (
                            <input
                                className="mt-1 block w-full bg-black text-white ansi-box-cursor"
                                defaultValue={data.address}
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                        ) : (
                                <dd className="mt-1 text-white">{data.address}</dd>
                        )}

                        <dt className="text-sm font-bold">City</dt>
                        {isEditing ? (
                            <input
                                className="mt-1 block w-full bg-black text-white ansi-box-cursor"
                                defaultValue={data.city}
                                onChange={(e) => handleChange('phone', e.target.value)}
                            />
                        ) : (
                            <dd className="mt-1 text-white">{data.city}</dd>
                        )}
                        <dt className="text-sm font-bold">State</dt>
                        {isEditing ? (
                            <input
                                className="mt-1 block w-full bg-black text-white ansi-box-cursor"
                                defaultValue={data.state}
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                        ) : (
                            <dd className="mt-1 text-white">{data.state}</dd>
                        )}
                        <dt className="text-sm font-bold">Zip</dt>
                        {isEditing ? (
                            <input
                                className="mt-1 block w-full bg-black text-white ansi-box-cursor"
                                defaultValue={data.zip}
                                onChange={(e) => handleChange('phone', e.target.value)}
                            />
                        ) : (
                            <dd className="mt-1 text-white">{data.zip}</dd>
                        )}
                        
                    </div>
                </dl>
            </div>
        </div>
    );
}






export function DL({ data, isEditing, setEditableData }) {
    // Add a check to handle cases where the 'data' is undefined or missing properties
    if (!data) {
        return <p className="text-red-500">No driver's license information available.</p>;
    }

    const handleChange = (field, value) => {
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


export function Logs({ data, isEditing, setEditableData }) {
    const handleChange = (logId, field, value) => {
        setEditableData((prevData) => ({
            ...prevData,
            logs: prevData.logs.map((log) =>
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

export function Banks({ data, isEditing, setEditableData }) {
    const handleChange = (index, field, value) => {
        setEditableData((prevData) => ({
            ...prevData,
            banks: prevData.banks.map((bank, i) =>
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
