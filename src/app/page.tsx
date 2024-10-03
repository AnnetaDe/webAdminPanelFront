'use client';
import Image from 'next/image';
import { ProfileInfo } from './admin/ProfileInfo';
import { useProfile } from '@/hooks/useProfile';
import { MainChart } from './admin/charts/MainChart';
import { Numbers } from './admin/charts/Numbers';
import { RadarChart } from './admin/charts/RadarChart';
import { RecentVideo } from './admin/RecentVideo';
import { ManageUsers } from './admin/users/ManageUsers';

export default function Home() {
  const { user, isLoading } = useProfile();
  return (
    <main>
      annfront
      <ProfileInfo />
      {!user.isAdmin ? (
        <p>Not admin</p>
      ) : (
        <div>
          <MainChart />
          <Numbers />
          <div>
            <RadarChart />
            <RecentVideo />
            <ManageUsers />
          </div>
        </div>
      )}
    </main>
  );
}
