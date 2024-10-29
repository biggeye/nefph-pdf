'use client';

import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
    Bars3Icon,
    XMarkIcon,
    HomeIcon,
    UsersIcon,
    FolderIcon,
} from '@heroicons/react/24/outline';
import { ThemeProvider } from 'next-themes';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { useRouter } from 'next/navigation';

const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Prophylez', href: '/protected/profiles', icon: UsersIcon, current: false },
    { name: 'Barcodes', href: '/protected/barcode', icon: FolderIcon, current: false },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {/* Mobile Sidebar */}
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 text-green-500 font-mono p-6">
                                <div className="absolute top-0 right-0 p-2.5">
                                    <button
                                        type="button"
                                        className="text-white"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>
                                <nav className="mt-5 space-y-1">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current
                                                    ? 'bg-green-900 text-white'
                                                    : 'text-green-400 hover:bg-green-900 hover:text-white',
                                                'flex items-center gap-4 p-2 rounded-md text-sm font-semibold'
                                            )}
                                        >
                                            <item.icon className="h-6 w-6" />
                                            {item.name}
                                        </a>
                                    ))}
                                </nav>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static Sidebar for Desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-20 lg:flex-col bg-gray-800 border-r-4 border-black">
                <div className="flex h-16 items-center justify-center">
                    <img src="@/data/finalhorizon.svg" alt="Logo" className="h-8 w-auto" />
                </div>
                <nav className="flex flex-col items-center space-y-1 mt-8">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                                item.current
                                    ? 'bg-green-900 text-white'
                                    : 'text-green-400 hover:bg-green-900 hover:text-white',
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
            <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-800 border-b-4 border-black px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                <button type="button" className="-m-2.5 p-2.5 text-green-400" onClick={() => setSidebarOpen(true)}>
                    <Bars3Icon className="h-6 w-6" />
                    <span className="sr-only">Open sidebar</span>
                </button>
                <div className="flex-1 text-sm font-semibold text-green-500">seePeeNz</div>
            </div>

            {/* Main Content with Gradient */}
            <main className="lg:pl-20 min-h-screen bg-gradient-to-l from-white to-gray-800 text-green-500 font-mono">
                <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full mx-auto flex items-center justify-center border-t text-center text-xs gap-8 py-16 text-green-500 bg-black">
                <p>&copy; 2024 b!gG3yedATa</p>
                <ThemeSwitcher />
            </footer>
        </ThemeProvider>
    );
}
