import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'FlightFinder',
  description: 'Find your perfect flight.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
