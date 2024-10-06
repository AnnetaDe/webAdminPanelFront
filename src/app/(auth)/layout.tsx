import { getServerAuth } from '@/utils/get-server-auth';
import { redirect } from 'next/navigation';
import React from 'react';

import type { PropsWithChildren } from 'react';
import DashboardTable from '../../components/ui/table/DashboardTable';

export default async function Layout({ children }: PropsWithChildren<unknown>) {
  console.log('LoginRegisterLayout');
  const user = await getServerAuth();
  if (user?.isLoggedIn) {
    return redirect('/');
  }
  return (
    <>
      <div>Login or register</div>

      {children}
    </>
  );
}
