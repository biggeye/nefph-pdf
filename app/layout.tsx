// app/layout.tsx
import './globals.css';
import AppLayout from './AppLayout';

export const metadata = {
    title: 'ch@$!ngPl@c3mEnt$',
    description: 'established 2024',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
            <AppLayout>
                    {children} {/* This will render the contents of AppLayout */}
                </AppLayout>
            </body>
        </html>
    );
}
