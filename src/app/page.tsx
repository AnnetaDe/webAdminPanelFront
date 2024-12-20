'use client';
import Image from 'next/image';
import React, { FC } from 'react';

import { ProfileInfo } from './admin/ProfileInfo';
import { useProfile } from '@/hooks/useProfile';
import { MainChart } from './admin/charts/MainChart';
import { Numbers } from './admin/charts/Numbers';
import { RadarChart } from './admin/charts/RadarChart';
import { ManageUsers } from './admin/users/ManageUsers';
import { Loader } from '@/components/ui/loader/Loader';
import { DoughnutChart } from './admin/charts/DouhtnutChart';

export default function Home() {
  const { isLoading, user } = useProfile();

  return isLoading ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loader />
      <div className="text-white">Home...</div>
    </div>
  ) : (
    <main className="min-h-screen p-6">
      <ProfileInfo />

      {!user.isAdmin ? (
        'You are not an admin'
      ) : (
        <>
          <MainChart />
          <Numbers />
          <div>
            <RadarChart />
            <DoughnutChart />
            <ManageUsers />
          </div>
        </>
      )}
    </main>
  );
}
