'use client';
import Image from 'next/image';
import { ProfileInfo } from './admin/ProfileInfo';
import { useProfile } from '@/hooks/useProfile';

export default function Home() {
  const { user, isLoading } = useProfile();
  return (
    <main>
      annfront
      {/* <ProfileInfo /> */}
      {!user.isAdmin && <p>Not admin</p>}
    </main>
  );
}
