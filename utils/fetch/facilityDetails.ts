import { createClient } from '@/utils/supabase/client';
const supabase = createClient();

export async function fetchFacilities() {
    const { data, error } = await supabase
        .from('facilities')
        .select('facility_id, name, contact, contact_phone, address, city, state, zip');
    console.log("Facilities: ", data);
    if (error) {
        console.error("Error fetching facilities:", error);
        throw error;
    }

    return data.map(facility => ({
        ...facility,
        imageUrl: `https://lcutmlfqpizazwooskgr.supabase.co/storage/v1/object/public/facilities/${facility.facility_id}.png`
    }));
}