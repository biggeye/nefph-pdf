'use client';

import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { fetchPlacements } from '@/utils/fetch/placementDetails';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isWithinInterval, parseISO } from 'date-fns';

export default function PlacementCalendar({ month, selectedPatient }) {
    const [placements, setPlacements] = useState([]);
    const [filteredPlacements, setFilteredPlacements] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(month || new Date());
    const [hoveredPlacement, setHoveredPlacement] = useState(null); // Track hovered placement

    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    });

    useEffect(() => {
        const fetchAndFilterPlacements = async () => {
            try {
                const data = await fetchPlacements();
                let filtered = data;

                if (selectedPatient) {
                    filtered = data.filter(
                        (placement) => `${placement.patient_firstname} ${placement.patient_lastname}` === selectedPatient
                    );
                }

                setFilteredPlacements(filtered);
                setPlacements(data);
            } catch (error) {
                console.error('Error fetching placements:', error);
            }
        };

        fetchAndFilterPlacements();
    }, [currentMonth, selectedPatient]);

    const isPlacementOnDay = (day, placement) => {
        const beginningDate = parseISO(placement.beginning);
        const endDate = placement.end ? parseISO(placement.end) : new Date();
        return isWithinInterval(day, { start: beginningDate, end: endDate });
    };

    const previousMonth = () => {
        setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
    };

    return (
        <div className="relative">
            <h2 className="text-base font-semibold leading-6 text-gray-900">Placement Calendar</h2>
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                <div className="mt-10 text-center lg:col-start-1 lg:col-end-13">
                    <div className="flex items-center text-gray-900">
                        <button
                            type="button"
                            onClick={previousMonth}
                            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Previous month</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <div className="flex-auto text-sm font-semibold">
                            {format(currentMonth, 'MMMM yyyy')}
                        </div>
                        <button
                            type="button"
                            onClick={nextMonth}
                            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Next month</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                        <div>S</div>
                    </div>
                    <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                        {daysInMonth.map((day, dayIdx) => (
                            <div
                                key={day.toISOString()}
                                className={classNames(
                                    'py-1.5 hover:bg-gray-100 focus:z-10',
                                    'bg-white',
                                    dayIdx === 0 && 'rounded-tl-lg',
                                    dayIdx === 6 && 'rounded-tr-lg',
                                    dayIdx === daysInMonth.length - 7 && 'rounded-bl-lg',
                                    dayIdx === daysInMonth.length - 1 && 'rounded-br-lg'
                                )}
                            >
                                <time
                                    dateTime={day.toISOString()}
                                    className="mx-auto flex h-7 w-7 items-center justify-center rounded-full"
                                >
                                    {format(day, 'd')}
                                </time>

                                {/* Render placement spans */}
                                {filteredPlacements
                                    .filter((placement) => isPlacementOnDay(day, placement))
                                    .map((placement) => (
                                        <div
                                            key={placement.beginning}
                                            className="relative mt-1 h-1 w-full rounded bg-indigo-600"
                                            onMouseEnter={() => setHoveredPlacement(placement)}  // Set hovered placement
                                            onMouseLeave={() => setHoveredPlacement(null)}  // Clear hover on mouse leave
                                        >
                                            <span className="sr-only">
                                                {placement.patient_firstname} {placement.patient_lastname} at {placement.facility_name}
                                            </span>

                                            {/* Hover popup (tooltip) */}
                                            {hoveredPlacement === placement && (
                                                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-max p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg z-10">
                                                    {`${placement.patient_firstname} ${placement.patient_lastname}`}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
