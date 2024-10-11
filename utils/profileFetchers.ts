// utils/profileFetchers.ts

import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

/**
 * Fetch all entries from a given table
 * @param {string} table - The name of the table to fetch from.
 */
export const fetchAll = async (table: string) => {
    const { data, error } = await supabase.from(table).select('*');
    if (error) {
        console.error(`Error fetching data from ${table}:`, error);
        return null;
    }
    return data;
};

/**
 * Fetch data by an individual's ID
 * @param {string} table - The name of the table to fetch from.
 * @param {number} individualId - The ID of the individual to fetch data for.
 */
export const fetchByIndividualId = async (table: string, individualId: number) => {
    const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('individual_id', individualId);

    if (error) {
        console.error(`Error fetching data from ${table} for individual ID ${individualId}:`, error);
        return null;
    }
    return data;
};

/**
 * Fetch single record by primary key
 * @param {string} table - The name of the table to fetch from.
 * @param {string} primaryKey - The primary key column name.
 * @param {any} id - The primary key value to fetch the record for.
 */
export const fetchById = async (table: string, primaryKey: string, id: any) => {
    const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq(primaryKey, id)
        .single();

    if (error) {
        console.error(`Error fetching data from ${table} by ${primaryKey}:`, error);
        return null;
    }
    return data;
};

/**
 * Fetch the list of addresses for a given individual ID
 * @param {number} individualId
 */
export const fetchAddresses = (individualId: number) => fetchByIndividualId('addresses', individualId);

/**
 * Fetch the list of criminal records for a given individual ID
 * @param {number} individualId
 */
export const fetchCriminalRecords = (individualId: number) => fetchByIndividualId('criminal_records', individualId);

/**
 * Fetch the driver's license details for a given individual ID
 * @param {number} individualId
 */
export const fetchDriversLicense = (individualId: number) => fetchByIndividualId('driverslicense', individualId);

/**
 * Fetch the list of emails for a given individual ID
 * @param {number} individualId
 */
export const fetchEmails = (individualId: number) => fetchByIndividualId('emails', individualId);

/**
 * Fetch the list of jobs for a given individual ID
 * @param {number} individualId
 */
export const fetchJobs = (individualId: number) => fetchByIndividualId('jobs', individualId);

/**
 * Fetch the list of owned automobiles for a given individual ID
 * @param {number} individualId
 */
export const fetchOwnedAutomobiles = (individualId: number) => fetchByIndividualId('owned_automobiles', individualId);
