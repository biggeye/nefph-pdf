'use client'

import { useState, Fragment } from 'react'
import * as Headless from '@headlessui/react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { LayoutGroup, motion } from 'framer-motion'
import { TouchTarget } from './button'
import { Link } from './link'

// Mock authentication hook (replace with your actual auth logic)
function useAuth() {
    const [user, setUser] = useState(null) // Set this based on actual authentication status
    const isAuthenticated = !!user
    return { user, isAuthenticated, login: () => setUser({ name: 'John Doe' }), logout: () => setUser(null) }
}

export function Navbar({ className, ...props }: React.ComponentPropsWithoutRef<'nav'>) {
    return <nav {...props} className={clsx(className, 'flex flex-1 items-center gap-4 py-2.5')} />
}

export function NavbarDivider({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    return <div aria-hidden="true" {...props} className={clsx(className, 'h-6 w-px bg-zinc-950/10 dark:bg-white/10')} />
}

export function NavbarSection({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    let id = useId()

    return (
        <LayoutGroup id={id}>
            <div {...props} className={clsx(className, 'flex items-center gap-3')} />
        </LayoutGroup>
    )
}

export function NavbarSpacer({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    return <div aria-hidden="true" {...props} className={clsx(className, '-ml-4 flex-1')} />
}

export const NavbarItem = forwardRef(function NavbarItem(
    {
        current,
        className,
        children,
        ...props
    }: { current?: boolean; className?: string; children: React.ReactNode } & (
        | Omit<Headless.ButtonProps, 'as' | 'className'>
        | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'>
    ),
    ref: React.ForwardedRef<HTMLAnchorElement | HTMLButtonElement>
) {
    let classes = clsx(
        'relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium text-zinc-950 sm:text-sm/5',
        'data-[hover]:bg-zinc-950/5 data-[active]:bg-zinc-950/5 dark:text-white',
        'dark:data-[hover]:bg-white/5 dark:data-[active]:bg-white/5'
    )

    return (
        <span className={clsx(className, 'relative')}>
            {current && (
                <motion.span
                    layoutId="current-indicator"
                    className="absolute inset-x-2 -bottom-2.5 h-0.5 rounded-full bg-zinc-950 dark:bg-white"
                />
            )}
            {'href' in props ? (
                <Link {...props} className={classes} data-current={current ? 'true' : undefined} ref={ref as React.ForwardedRef<HTMLAnchorElement>}>
                    <TouchTarget>{children}</TouchTarget>
                </Link>
            ) : (
                <Headless.Button {...props} className={clsx('cursor-default', classes)} data-current={current ? 'true' : undefined} ref={ref}>
                    <TouchTarget>{children}</TouchTarget>
                </Headless.Button>
            )}
        </span>
    )
})

// User Profile Avatar & Dropdown Menu for Authenticated Users
export function UserProfile() {
    const router = useRouter()
    const { user, isAuthenticated, login, logout } = useAuth()

    return (
        <NavbarSection>
            {isAuthenticated ? (
                <Headless.Menu as="div" className="relative">
                    <div>
                        <Headless.Menu.Button className="flex items-center">
                            <img
                                src={user?.avatar || '/default-avatar.png'} // Replace with user avatar or default image
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                        </Headless.Menu.Button>
                    </div>
                    <Headless.Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Headless.Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Headless.Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={clsx(active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700')}
                                            onClick={() => router.push('/profile-settings')}
                                        >
                                            Profile Settings
                                        </button>
                                    )}
                                </Headless.Menu.Item>
                                <Headless.Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={clsx(active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700')}
                                            onClick={logout}
                                        >
                                            Logout
                                        </button>
                                    )}
                                </Headless.Menu.Item>
                            </div>
                        </Headless.Menu.Items>
                    </Headless.Transition>
                </Headless.Menu>
            ) : (
                <button onClick={() => router.push('/login')} className="flex items-center text-sm">
                    <img src="/default-avatar.png" alt="Login" className="w-8 h-8 rounded-full" />
                    <span className="ml-2">Login</span>
                </button>
            )}
        </NavbarSection>
    )
}
