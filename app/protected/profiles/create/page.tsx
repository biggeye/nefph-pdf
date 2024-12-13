// app/protected/profiles/create/page.tsx

import MultiStepForm from '@/components/profiles/MultiStepForm';

export default function CreateProfilePage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create New Profile</h1>
            <MultiStepForm />
        </div>
    );
}
