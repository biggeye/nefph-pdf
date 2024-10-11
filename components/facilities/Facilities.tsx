import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisHorizontalIcon, PhoneIcon } from '@heroicons/react/20/solid';

// Helper function to join class names
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Facilities({ facilities }) {
    return (
        <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
            {facilities.map((facility) => (
                <li key={facility.id} className="overflow-hidden rounded-xl border border-gray-200">
                    <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                        <img
                            alt={facility.name}
                            src={facility.imageUrl}  // Using the dynamically generated image URL
                            className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                        />
                        <div className="text-sm font-medium leading-6 text-gray-900">{facility.name}</div>
                        <Menu as="div" className="relative ml-auto">
                            <MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Open options</span>
                                <EllipsisHorizontalIcon aria-hidden="true" className="h-5 w-5" />
                            </MenuButton>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none"
                            >
                                <MenuItem>
                                    <a href="#" className="block px-3 py-1 text-sm leading-6 text-gray-900">
                                        View<span className="sr-only">, {facility.name}</span>
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a href="#" className="block px-3 py-1 text-sm leading-6 text-gray-900">
                                        Edit<span className="sr-only">, {facility.name}</span>
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                    <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                        <div className="flex justify-between gap-x-4 py-3">
                            <dt className="text-gray-500">Address</dt>
                            <dd className="text-gray-700">
                                {facility.address}, {facility.city}, {facility.state} {facility.zip}
                            </dd>
                        </div>
                        <div className="flex justify-between gap-x-4 py-3">
                            <dt className="text-gray-500">Contact</dt>
                            <dd className="flex items-start gap-x-2">
                                <div className="font-medium text-gray-900">{facility.contact}</div>
                                <a
                                    href={`tel:${facility.contact_phone}`}
                                    className="ml-auto text-blue-500 hover:underline"
                                >
                                    <PhoneIcon aria-hidden="true" className="h-5 w-5 text-blue-400" />
                                </a>
                            </dd>
                        </div>
                    </dl>
                </li>
            ))}
        </ul>
    );
}
