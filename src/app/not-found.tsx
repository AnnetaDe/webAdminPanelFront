// pages/404.tsx
'use client';

import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">
        Oops! The page you are looking for could not be found.
      </p>
      <Link href="/">Go back home</Link>
    </div>
  );
}
