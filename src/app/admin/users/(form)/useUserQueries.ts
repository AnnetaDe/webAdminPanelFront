import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

import userService from '@/services/user.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { IQueriesResult, IUserFormState } from './user-form.types';

export function useUserQueries(id = '', isCreateForm: boolean): IQueriesResult {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUserById(id),
  });

  const router = useRouter();
  const [isNeedResetForm, setIsNeedResetForm] = useState(false);

  const { mutate: createUser } = useMutation({
    mutationKey: ['createUser'],
    mutationFn: (data: IUserFormState) => userService.createUser(data),
    onSuccess() {
      toast.success('Create user success!');
      refetch();
      setIsNeedResetForm(true);
      router.push('/');
    },
  });

  const { mutate: updateUser, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: (data: IUserFormState) => userService.updateUser(id, data),
    onSuccess() {
      toast.success('Update user success!');
      refetch();
      router.back();
    },
  });

  const onSubmit: SubmitHandler<IUserFormState> = async data => {
    if (isCreateForm) {
      createUser(data);
    } else if (id) {
      updateUser(data);
    }
  };

  return {
    data: data?.data,
    isLoading: isLoading || isLoadingUpdate,
    onSubmit,
    isNeedResetForm,
  };
}
