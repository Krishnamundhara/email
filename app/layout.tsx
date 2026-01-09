import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Email Verification & Campaign Sender',
  description: 'Production-ready bulk email verification and SMTP campaign sender',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
