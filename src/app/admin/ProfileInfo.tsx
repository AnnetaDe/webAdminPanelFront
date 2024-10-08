import { useProfile } from '@/hooks/useProfile';
import authService from '@/services/auth/auth.service';
import { useMutation } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function ProfileInfo() {
  const router = useRouter();

  const { user } = useProfile();

  const { mutate: mutateLogout, isPending: isLogoutPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess() {
      router.push('/login');
    },
  });

  return (
    user && (
      <div className="mb-8 flex gap-5">
        {user.avatarUrl && (
          <Image src={user.avatarUrl} alt="Avatar" width={100} height={100} />
        )}
        <div>
          <h2 className="text-2xl font-bold">Hello! {user.role}</h2>
          <p className="text-lg">Your email: {user.email}</p>
          <p className="text-lg">Your accses type: {user.role}</p>

          <button onClick={() => mutateLogout()} disabled={isLogoutPending}>
            <LogOut />
          </button>
        </div>
      </div>
    )
  );
}
