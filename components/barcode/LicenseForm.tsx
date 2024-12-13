'use client';

import generateBarcode from 'pdf417';
import { useState } from 'react';

const LicenseForm = () => {
    const [formData, setFormData] = useState({
        aamvaVersion: '',
        jurisdictionVersion: '',
        firstName: '',
        middleName: '',
        lastName: '',
        dob: '',
        height: '',
        weight: '',
        eyes: '',
        hair: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        dlNumber: '',
        icn: '',
        dd: '',
    });

    // State for storing barcode
    const [barcodeSrc, setBarcodeSrc] = useState(null);

    const iinIndex = {
        AL: '636033',
        AK: '636059',
        AZ: '636026',
        AR: '636021',
        CA: '636014',
        CO: '636020',
        CT: '636006',
        DE: '636011',
        FL: '636010',
        GA: '636055',
        HI: '636047',
        ID: '636050',
        IL: '636035',
        IN: '636037',
        IA: '636018',
        KS: '636022',
        KY: '636046',
        LA: '636007',
        ME: '636041',
        MD: '636003',
        MA: '636002',
        MI: '636032',
        MN: '636038',
        MS: '636051',
        MO: '636030',
        MT: '636008',
        NE: '636054',
        NV: '636049',
        NH: '636039',
        NJ: '636036',
        NM: '636009',
        NY: '636001',
        NC: '636004',
        ND: '636034',
        OH: '636023',
        OK: '636058',
        OR: '636029',
        PA: '636025',
        RI: '636052',
        SC: '636005',
        SD: '636042',
        TN: '636053',
        TX: '636015',
        UT: '636040',
        VT: '636024',
        VA: '636000',
        WA: '636045',
        WV: '636061',
        WI: '636031',
        WY: '636060',
    };

    // Handle input changes for form fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Format height from feet and inches to total inches
    const formatHeight = (feet, inches) => {
        const totalInches = parseInt(feet, 10) * 12 + parseInt(inches, 10);
        return totalInches.toString().padStart(3, '0') + ' IN'; // Ensure 3-digit height
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent page reload

        // Get the IIN code based on the selected state
        const stateIIN = iinIndex[formData.state] || '000000'; // Default to '000000' if state not found

        // Construct a string for barcode generation based on form data
        const ansiHeader = `@

        ANSI ${stateIIN}${aamvaVersion}${jurisdictionVersion}02`;

        const barcodeDataString = `${ansiHeader}${formData.docType}00410287ZC03280024${formData.docType}DAQ${formData.licenseNumber}
      DCS${formData.lastName}
      DDE${formData.lastName.length > 40 ? 'T' : 'N'}
      DAC${formData.firstName}
      DDF${formData.firstName.length > 40 ? 'T' : 'N'}
      DAD${formData.middleName}
      DDG${formData.middleName.length > 40 ? 'T' : 'N'}
      DCA${formData.classification}
      DCB01
      DCDNONE
      DBD${formData.issueDate}
      DBB${formData.bday}
      DBA${formData.expiryDate}
      DBC${formData.gender}
      DAU${formatHeight(formData.heightFT, formData.heightIn)}
      DAW${formData.weight}
      DAY${formData.eyeColor}
      DAG${formData.street}
      DAI${formData.city}
      DAJ${formData.state}
      DAK${formData.zip}
      DCF${formData.icn}
      DCGUSA
      DAZ${formData.hairColor}
      DCK${formData.icn}
      DDA${formData.dd}
      DDB08292017
      DDK1
      ZCZ${formData.eyeColor}
      ZCB${formData.hairColor}
      ZCC
      ZCD`;

        // Generate barcode image
        const barcodeImage = generateBarcode(barcodeDataString, 20, 8); // Block width and height
        setBarcodeSrc(barcodeImage); // Set barcode image source
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information Section */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-700">PERSONAL INFORMATION</h2>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                        {/* First Name */}
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {/* Last Name */}
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {/* Birthday */}
                        <input
                            type="date"
                            name="bday"
                            value={formData.bday}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {/* Height */}
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                name="heightFT"
                                placeholder="Height (ft)"
                                min="4"
                                max="7"
                                value={formData.heightFT}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                            <input
                                type="number"
                                name="heightIn"
                                placeholder="Height (in)"
                                min="0"
                                max="11"
                                value={formData.heightIn}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                        </div>
                        {/* Weight */}
                        <input
                            type="number"
                            name="weight"
                            placeholder="Weight (lbs)"
                            min="50"
                            max="500"
                            value={formData.weight}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {/* Eye Color */}
                        <select
                            name="eyeColor"
                            value={formData.eyeColor}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">Eye Color</option>
                            <option value="BLK">Black</option>
                            <option value="BLU">Blue</option>
                            <option value="BRO">Brown</option>
                            <option value="GRN">Green</option>
                            <option value="HAZ">Hazel</option>
                            <option value="GRY">Gray</option>
                        </select>
                        {/* Hair Color */}
                        <select
                            name="hairColor"
                            value={formData.hairColor}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">Hair Color</option>
                            <option value="BLK">Black</option>
                            <option value="BLN">Blonde</option>
                            <option value="BRO">Brown</option>
                            <option value="RED">Red</option>
                            <option value="GRY">Gray</option>
                        </select>
                    </div>
                </div>

                {/* Address Section */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-700">ADDRESS</h2>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-4">
                        <input
                            type="text"
                            name="street"
                            placeholder="Street"
                            value={formData.street}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">State</option>
                            {Object.keys(iinIndex).map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="zip"
                            placeholder="ZIP Code"
                            value={formData.zip}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                </div>

                {/* License Section */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-700">DOCUMENT DATA</h2>
                    <div className="grid grid-cols-3 gap-x-4">
                        <select
                            name="docType"
                            value={formData.docType}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="ID">Identification Card</option>
                            <option value="DL">Driver's License</option>
                        </select>
                        <input
                            type="text"
                            name="classification"
                            placeholder="Classification"
                            value={formData.classification}
                            onChange={handleChange}
                            className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm"
                        />
                        <input
                            type="text"
                            name="licenseNumber"
                            placeholder="Document Number"
                            value={formData.licenseNumber}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 mt-4">
                        <input
                            type="date"
                            name="issueDate"
                            placeholder="Issue Date"
                            value={formData.issueDate}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        <input
                            type="date"
                            name="expiryDate"
                            placeholder="Expiration Date"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 mt-4">
                        <input
                            type="text"
                            name="icn"
                            placeholder="ICN"
                            value={formData.icn}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        <input
                            type="text"
                            name="dd"
                            placeholder="Document Discriminator (DD)"
                            value={formData.dd}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </div>

                {barcodeSrc && (
                    <div className="mt-6">
                        <h3>Generated Barcode:</h3>
                        <img src={barcodeSrc} alt="Generated PDF417 Barcode" />
                        <h3>{formData.firstName} {formData.lastName}</h3>
                    </div>
                )}
            </form>
        </>
    );
};

export default LicenseForm;
