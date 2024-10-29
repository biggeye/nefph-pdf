// /utils/assets.ts
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

// Define the asset type
interface Asset {
    cpn_id: string;
    url: string;
    type: string;
    description?: string;  // Optional field
}

// Upload file to Supabase storage
export async function uploadFileToStorage(file: File, fileName: string): Promise<string> {
    const { data, error } = await supabase
        .storage
        .from('assets')
        .upload(`profiles/${fileName}`, file);

    if (error) throw new Error('File upload failed: ' + error.message);

    return data?.path ?? '';  // Return file path or URL
}

// Save the file reference to the assets table
export async function saveAssetToDatabase(cpnId: string, fileUrl: string, fileType: string, description?: string): Promise<void> {
    const { error } = await supabase.from<Asset>('assets').insert({
        cpn_id: cpnId,
        url: fileUrl,
        type: fileType,
        description,  // Optional field
    });

    if (error) throw new Error('Saving asset to database failed: ' + error.message);
}

// Fetch assets by profile (cpn_id)
export async function fetchAssets(cpnId: string): Promise<Asset[]> {
    const { data, error } = await supabase.from<Asset>('assets').select('*').eq('cpn_id', cpnId);

    if (error) throw new Error('Fetching assets failed: ' + error.message);

    return data ?? [];
}
