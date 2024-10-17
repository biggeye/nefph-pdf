import React from 'react';

export default function UpdateProfileForm({
    individual,
    aliases,
    addresses,
    emails,
    phoneNumbers,
    criminalRecords,
    ownedAutomobiles,
    jobs,
    handleInputChange,
    handleDynamicInputChange,
    handleAddField,
    handleSave,
    loading,
    id,
}) {
    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-semibold">{id ? 'Edit Profile' : 'Create Profile'}</h2>
            <form onSubmit={handleSave}>
                {/* Main Form Fields */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={individual.first_name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={individual.last_name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        value={individual.date_of_birth}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <input
                        type="text"
                        name="gender"
                        value={individual.gender}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                {/* Dynamic Fields: Aliases */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Alias(es)</label>
                    {aliases.map((alias, index) => (
                        <input
                            key={index}
                            type="text"
                            value={alias}
                            onChange={(e) => handleDynamicInputChange(setAliases, aliases, index, e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    ))}
                    <button type="button" onClick={() => handleAddField(setAliases, aliases)} className="mt-2 text-indigo-600">
                        Add Another Alias
                    </button>
                </div>

                {/* Dynamic Fields: Addresses */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Address(es)</label>
                    {addresses.map((address, index) => (
                        <input
                            key={index}
                            type="text"
                            value={address}
                            onChange={(e) => handleDynamicInputChange(setAddresses, addresses, index, e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    ))}
                    <button type="button" onClick={() => handleAddField(setAddresses, addresses)} className="mt-2 text-indigo-600">
                        Add Another Address
                    </button>
                </div>

                {/* Dynamic Fields: Emails */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Email(s)</label>
                    {emails.map((email, index) => (
                        <input
                            key={index}
                            type="email"
                            value={email}
                            onChange={(e) => handleDynamicInputChange(setEmails, emails, index, e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    ))}
                    <button type="button" onClick={() => handleAddField(setEmails, emails)} className="mt-2 text-indigo-600">
                        Add Another Email
                    </button>
                </div>

                {/* Dynamic Fields: Phone Numbers */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Phone Number(s)</label>
                    {phoneNumbers.map((phone, index) => (
                        <input
                            key={index}
                            type="text"
                            value={phone}
                            onChange={(e) => handleDynamicInputChange(setPhoneNumbers, phoneNumbers, index, e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    ))}
                    <button type="button" onClick={() => handleAddField(setPhoneNumbers, phoneNumbers)} className="mt-2 text-indigo-600">
                        Add Another Phone Number
                    </button>
                </div>

                {/* Dynamic Fields: Criminal Records */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Criminal Record(s)</label>
                    {criminalRecords.map((record, index) => (
                        <div key={index} className="mt-2">
                            <label className="block text-sm font-medium text-gray-700">Offense</label>
                            <input
                                type="text"
                                value={record.offense}
                                onChange={(e) => handleDynamicInputChange(
                                    setCriminalRecords,
                                    criminalRecords,
                                    index,
                                    e.target.value
                                )}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                value={record.date}
                                onChange={(e) => handleDynamicInputChange(
                                    setCriminalRecords,
                                    criminalRecords,
                                    index,
                                    e.target.value
                                )}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAddField(setCriminalRecords, criminalRecords)} className="mt-2 text-indigo-600">
                        Add Another Criminal Record
                    </button>
                </div>

                {/* Dynamic Fields: Owned Automobiles */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Owned Automobile(s)</label>
                    {ownedAutomobiles.map((auto, index) => (
                        <div key={index} className="mt-2">
                            <label className="block text-sm font-medium text-gray-700">Make</label>
                            <input
                                type="text"
                                value={auto.make}
                                onChange={(e) => handleDynamicInputChange(
                                    setOwnedAutomobiles,
                                    ownedAutomobiles,
                                    index,
                                    e.target.value
                                )}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            <label className="block text-sm font-medium text-gray-700">Model</label>
                            <input
                                type="text"
                                value={auto.model}
                                onChange={(e) => handleDynamicInputChange(
                                    setOwnedAutomobiles,
                                    ownedAutomobiles,
                                    index,
                                    e.target.value
                                )}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            <label className="block text-sm font-medium text-gray-700">Year</label>
                            <input
                                type="text"
                                value={auto.year}
                                onChange={(e) => handleDynamicInputChange(
                                    setOwnedAutomobiles,
                                    ownedAutomobiles,
                                    index,
                                    e.target.value
                                )}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAddField(setOwnedAutomobiles, ownedAutomobiles)} className="mt-2 text-indigo-600">
                        Add Another Automobile
                    </button>
                </div>

                {/* Dynamic Fields: Jobs */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Job(s)</label>
                    {jobs.map((job, index) => (
                        <div key={index} className="mt-2">
                            <label className="block text-sm font-medium text-gray-700">Position</label>
                            <input
                                type="text"
                                value={job.position}
                                onChange={(e) => handleDynamicInputChange(
                                    setJobs,
                                    jobs,
                                    index,
                                    e.target.value
                                )}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            <label className="block text-sm font-medium text-gray-700">Company</label>
                            <input
                                type="text"
                                value={job.company}
                                onChange={(e) => handleDynamicInputChange(
                                    setJobs,
                                    jobs,
                                    index,
                                    e.target.value
                                )}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input
                                type="date"
                                value={job.start_date}
                                onChange={(e) => handleDynamicInputChange(
                                    setJobs,
                                    jobs,
                                    index,
                                    e.target.value
                                )}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={() => handleAddField(setJobs, jobs)} className="mt-2 text-indigo-600">
                        Add Another Job
                    </button>
                </div>

                {/* Save Button */}
                <div className="mt-4">
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        disabled={loading}
                    >
                        {id ? 'Save Changes' : 'Create Profile'}
                    </button>
                </div>
            </form>
        </div>
    );
}

