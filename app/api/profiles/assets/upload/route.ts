// /app/api/profiles/assets/upload/route.ts
import { NextResponse } from 'next/server';
import { uploadFileToStorage, saveAssetToDatabase } from '@/utils/assets';

// Define the type for the expected request body
interface UploadRequest {
    cpnId: string;
    file: File;
    fileName: string;
    fileType: string;
    description?: string;  // Optional
}

export async function POST(req: Request) {
    const { cpnId, file, fileName, fileType, description }: UploadRequest = await req.json();

    // Step 1: Upload the file to Supabase storage
    const fileUrl = await uploadFileToStorage(file, fileName);

    // Step 2: Save the file reference in the assets table
    await saveAssetToDatabase(cpnId, fileUrl, fileType, description);

    return NextResponse.json({ message: 'File uploaded successfully', fileUrl });
}
