import { getServerAuth } from '@/utils/get-server-auth';
import { redirect } from 'next/navigation';
import React from 'react';

import type { PropsWithChildren } from 'react';

export default async function Layout({ children }: PropsWithChildren<unknown>) {
  console.log('LoginRegisterLayout');
  const user = await getServerAuth();
  if (user?.isLoggedIn) {
    return redirect('/');
  }
  return <>{children}</>;
}
