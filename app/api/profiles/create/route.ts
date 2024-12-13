import { NextResponse } from 'next/server';
import { PostgrestError } from '@supabase/supabase-js';
import {
    createProfile,
    createDL,
    createLog,
    createBank,
    createBusiness,
} from '@/utils/profiles';
import { Profile, DL, Logs, Banks, Business } from '@/data/types/profiles';

type FormData = {
    personal: Partial<Profile>;
    dl?: Partial<DL>;
    logs?: Partial<Logs>[];
    banks?: Partial<Banks>[];
    business?: Partial<Business>;
};

export async function POST(request: Request) {
    try {
        const formData: FormData = await request.json();

        // Create profile
        const personalData: Partial<Profile> = formData.personal;
        const { data: profileData, error: profileError } = await createProfile(personalData);

        if (profileError) {
            console.error('Error creating profile:', profileError.message);
            throw profileError;
        }

        if (!profileData) {
            throw new Error('Profile data is null after creation.');
        }

        const cpn_id = profileData.cpn_id;

        // Create DL
        if (formData.dl) {
            const dlData: DL = { ...formData.dl, cpn_id } as DL;
            const { error: dlError } = await createDL(dlData);
            if (dlError) {
                console.error('Error creating DL:', dlError.message);
                throw dlError;
            }
        }

        // Create Logs
        if (formData.logs && formData.logs.length > 0) {
            for (const logEntry of formData.logs) {
                const logData: Logs = { ...logEntry, cpn_id } as Logs;
                const { error: logError } = await createLog(logData);
                if (logError) {
                    console.error('Error creating log:', logError.message);
                    throw logError;
                }
            }
        }

        // Create Banks
        if (formData.banks && formData.banks.length > 0) {
            for (const bankEntry of formData.banks) {
                const bankData: Banks = { ...bankEntry, cpn_id } as Banks;
                const { error: bankError } = await createBank(bankData);
                if (bankError) {
                    console.error('Error creating bank:', bankError.message);
                    throw bankError;
                }
            }
        }

        // Create Business
        if (formData.business) {
            const businessData: Business = { ...formData.business, cpn_id } as Business;
            const { error: businessError } = await createBusiness(businessData);
            if (businessError) {
                console.error('Error creating business:', businessError.message);
                throw businessError;
            }
        }

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error creating profile:', error.message);
        } else if (isPostgrestError(error)) {
            console.error('Error creating profile:', error.message);
        } else {
            console.error('Error creating profile:', String(error));
        }
        return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
    }
}
function isPostgrestError(error: unknown): error is PostgrestError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        'code' in error
    );
}
