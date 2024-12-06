// app/layout.tsx
import { GeistSans } from 'geist/font/sans';
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
        <html lang="en" className={GeistSans.className}>
            <head>
                <script type="text/javascript" src="/lib/smartReader.js"></script>
            </head>
            <body className="bg-background text-foreground">
              

            <AppLayout>
                    {children} {/* This will render the contents of AppLayout */}
                </AppLayout>
            </body>
        </html>
    );
}
