import type { Metadata } from 'next';
import { UserForm } from '../UserForm';

export const metadata: Metadata = {
  title: 'User Create',
};

export default function CreateUserPage() {
  return <UserForm type="create" />;
}
