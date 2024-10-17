'use client'

import CreateNewEntry from "@/components/profiles/CreateProfile";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { Button } from "@/components/ui/button";

import { fetchIndividual } from "@/utils/fetch/profiles";

export default function Profiles() {
    const supabase = createClient();
    const [people, setPeople] = useState([]);

    useEffect(() => {
        async function fetchPeople() {
            const { data, error } = await supabase.from('individuals').select('*');
            if (error) {
                console.error('Error fetching people:', error);
            } else {
                setPeople(data);
            }
        }
        fetchPeople();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {people.map((person) => (
                <div
                    key={person.id}
                    className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                >
                    <div className="flex-shrink-0">
                        <img alt="" src={person.imageUrl || '/logo.png'} className="h-10 w-10 rounded-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <Link href={`/protected/profiles/${person.id}`} className="focus:outline-none">
                            <span aria-hidden="true" className="absolute inset-0" />
                            <p className="text-sm font-medium text-gray-900">{person.first_name} {person.last_name}</p>
                        </Link>
                    </div>
                </div>
            ))}
            <Button>
                <Link href={`/protected/profiles/new`} className="focus:outline-none">Create New Profile</Link>
            </Button>
        </div>
    );
}
