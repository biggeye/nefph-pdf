// /data/types/profiles.ts

export interface Profile {
    cpn_id: string;
    profile_id: number;
    first_name: string;
    last_name: string;
    ssn?: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    dob: string; // Date of birth
    dl_number?: string;
    site?: string;
    username?: string;
    password?: string;
    pin?: string;
    security_question?: string;
    answer?: string;
    picture_url?: string;
    role?: string;
}

export interface Logs {
    log_id: number;
    cpn_id: string;
    site: string;
    username: string;
    password: string;
    pin?: string;
    security_question?: string;
    answer?: string;
}

export interface DL {
    cpn_id: string;
    dl_number: string;
    issue_date: string;
    expiration_date: string;
    state_of_issue: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    gender: string;
    eye_color: string;
    hair_color: string;
    height: string;
    weight: string;
    dd: string;
    icn: string;
}

export interface Banks {
    bank_id: number;
    cpn_id: string;
    bank_name: string;
    account_number: string;
    routing_number: string;
    account_type: string;
}

export interface Asset {
    cpn_id: string;
    url: string;
    type: string;
    description?: string;
}

export interface Business {
    cpn_id: string;
    name: string;
    dba: string;
    ein: string;
    formation_date: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    type: string;
    payroll_provider?: string;
}

export type MultiStepFormData = {
    personal: Partial<Profile>;
    dl: Partial<DL>;
    logs: Partial<Logs>[];
    banks: Partial<Banks>[];
    business: Partial<Business>;
};

export type StepDataMap = {
    personal: Partial<Profile>;
    dl: Partial<DL>;
    logs: Partial<Logs>[];
    banks: Partial<Banks>[];
    business: Partial<Business>;
    summary: FormData;
};