import { saveTokenStorage } from '@/services/auth/auth.helper';
import authService from '@/services/auth/auth.service';
import { transformUserToState } from '@/utils/transform-user-to-state';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useProfile() {
  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => authService.profile(),
    refetchInterval: 1000,
  });

  const { isSuccess, data: dataTokens } = useQuery({
    queryKey: ['new tokens'],
    queryFn: () => authService.getNewTokens(),
    enabled: !data?.data,
  });

  useEffect(() => {
    if (!isSuccess) return;

    if (dataTokens.data.accessToken)
      saveTokenStorage(dataTokens.data.accessToken);
  }, [isSuccess]);

  const profile = data?.data;

  const userState = profile ? transformUserToState(profile) : null;

  return {
    isLoading,

    user: {
      ...profile,
      ...userState,
    },
  };
}
