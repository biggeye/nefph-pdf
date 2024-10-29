// dashboard.ts

// Type for each action item in the dashboard
export type ActionItem = {
    title: string;
    href: string;
    icon: IconType; // Using IconType for Heroicons icons
    iconForeground: string;
    iconBackground: string;
};

// Type for the array of actions
export type ActionsArray = ActionItem[];

// Type for each profile fetched from Supabase
export type Profile = {
    id: number;
    name: string;
    email: string;
    // Add any other specific fields from the `seepeeen` table if necessary
};

// Props type for the Dashboard component
export type DashboardProps = {}; // Specify any props if they are added later
