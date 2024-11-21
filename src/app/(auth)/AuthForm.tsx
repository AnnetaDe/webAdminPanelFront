'use client';

import { Button } from '@/components/ui/button/Button';
import { Field } from '@/components/ui/field/Field';
import { Loader } from '@/components/ui/loader/Loader';
import authService from '@/services/auth/auth.service';
import { IAuthFormData } from '@/types';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface AuthFormProps {
  isLogin: boolean;
}
const TEST_ACCOUNT = {
  email: 'aaaa@aaaaa.com',
  password: 'aaAAaa',
};

export function AuthForm({ isLogin }: AuthFormProps) {
  const { register, handleSubmit, reset } = useForm<IAuthFormData>();

  const router = useRouter();

  const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: IAuthFormData) => authService.main('login', data),
    onSuccess() {
      reset();
      router.push('/');
      toast.success('Login successful');
    },
    onError(error) {
      toast.error(error.message || 'Login failed');
    },
  });

  const {
    error,
    mutate: mutateRegister,
    isPending: isRegisterPending,
  } = useMutation({
    mutationKey: ['register'],
    mutationFn: (data: IAuthFormData) => authService.main('register', data),
    onSuccess() {
      reset();
      router.push('/');
      toast.success('Registration successful');
    },
    onError(error) {
      toast.error(error.message || 'Registration failed');
    },
  });

  const handleTestLogin = () => {
    mutateLogin(TEST_ACCOUNT);
  };

  const isPending = isLoginPending || isRegisterPending;

  const onSubmit: SubmitHandler<IAuthFormData> = data => {
    isLogin ? mutateLogin(data) : mutateRegister(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
      <Field
        extra="mb-4"
        label="Email"
        type="email"
        placeholder="Enter email: "
        {...register('email', { required: true })}
      />

      {error && <p className="text-red-500">{error.message}</p>}

      <Field
        extra="mb-4"
        label="password"
        type="password"
        placeholder="Enter password: "
        {...register('password', { required: true })}
      />

      <div className="mb-4">
        <Button
          type="submit"
          variant={isLogin ? 'primary' : 'secondary'}
          disabled={isPending}
        >
          {isPending ? <Loader /> : isLogin ? 'Login' : 'Register'}
        </Button>

        {isLogin && (
          <Button
            type="button"
            variant="secondary"
            disabled={isPending}
            onClick={handleTestLogin}
          >
            {isPending ? <Loader /> : 'Login with test account'}
          </Button>
        )}
      </div>
      {isLogin ? (
        <Link href={'/register'}>Don't have account? Register </Link>
      ) : (
        <Link href={'/login'}>Already have account? Login </Link>
      )}
    </form>
  );
}
