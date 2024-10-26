// /components/assets/MediaUploader.tsx
import { useState } from 'react';

interface MediaUploaderProps {
    cpnId: string;
    onUpload: (fileUrl: string) => void;
}

export default function MediaUploader({ cpnId, onUpload }: MediaUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState<string>('');  // Optional description field

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        const fileType = file.type;
        const fileName = file.name;

        const res = await fetch('/api/profiles/assets/upload', {
            method: 'POST',
            body: JSON.stringify({
                cpnId,
                file,
                fileName,
                fileType,
                description,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        onUpload(data.fileUrl);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <input
                type="text"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}
