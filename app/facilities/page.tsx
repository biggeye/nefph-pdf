'use client'
import { useEffect, useState } from 'react';
import Facilities from '@/components/facilities/Facilities'; // Import the Facilities component
import { fetchFacilities } from '@/utils/fetchFacilityDetails';  // Your fetch logic

export default function FacilitiesPage() {
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchFacilities();  // Fetch data
                setFacilities(data);  // Set facilities state
            } catch (error) {
                console.error("Error fetching facilities:", error);
            } finally {
                setLoading(false);  // Stop loading state
            }
        };

        fetchData();  // Fetch facilities on mount
    }, []);

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-semibold text-gray-900">Facilities</h1>
            <p className="mt-2 text-gray-600">A list of our available facilities with contact and address details.</p>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <Facilities facilities={facilities} /> 
            )}
        </div>
    );
}
