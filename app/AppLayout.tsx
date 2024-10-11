'use client';

import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import {
    Bars3Icon,
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,

} from '@heroicons/react/24/outline';

import { ThemeProvider } from 'next-themes';
import { ThemeSwitcher } from '@/components/theme-switcher';
import HeaderAuth from '@/components/header-auth';
import DeployButton from '@/components/deploy-button';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';

const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Patients', href: '/patients', icon: UsersIcon, current: false },
    { name: 'Facilities', href: '/facilities', icon: FolderIcon, current: false },
    { name: 'Calendar', href: '/calendar', icon: CalendarIcon, current: false },
    { name: 'Profiles', href: '/profiles', icon: DocumentDuplicateIcon, current: false },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {/* Mobile Sidebar Dialog */}
            <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                <DialogBackdrop className="fixed inset-0 bg-gray-900/80" />
                <div className="fixed inset-0 flex">
                    <DialogPanel className="relative w-full max-w-xs flex-1 bg-gray-900 p-6">
                        <div className="absolute top-0 right-0 p-2.5">
                            <button onClick={() => setSidebarOpen(false)} className="text-white">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <nav className="mt-5">
                            <ul className="space-y-1">
                                {navigation.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                'flex items-center gap-4 p-2 rounded-md text-sm font-semibold'
                                            )}
                                        >
                                            <item.icon className="h-6 w-6" />
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Static Sidebar for Desktop */}
            <div className="hidden lg:flex lg:flex-col lg:w-20 lg:bg-gray-900 lg:inset-y-0 lg:fixed lg:left-0">
                <div className="flex h-16 items-center justify-center">
                    <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
                </div>
                <nav className="flex flex-col items-center space-y-1 mt-8">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                                item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                'group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6'
                            )}
                        >
                            <item.icon className="h-6 w-6" />
                            <span className="sr-only">{item.name}</span>
                        </a>
                    ))}
                </nav>
            </div>

            {/* Topbar for Mobile */}
            <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-400">
                    <Bars3Icon className="h-6 w-6" />
                    <span className="sr-only">Open sidebar</span>
                </button>
                <div className="flex-1 text-white text-sm font-semibold">Dashboard</div>
                <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User Profile"
                    className="h-8 w-8 rounded-full bg-gray-800"
                />
            </div>

            {/* Main Content Area */}
            <main className="lg:pl-20">
                {/* Removed xl:pl-96 to prevent extra padding and empty space */}
                <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                    {children} {/* Main content goes here */}
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                <p>
                    Powered by{' '}
                    <a href="https://supabase.com" target="_blank" className="font-bold hover:underline">
                        Supabase
                    </a>
                </p>
                <ThemeSwitcher />
            </footer>
        </ThemeProvider>
    );
}
