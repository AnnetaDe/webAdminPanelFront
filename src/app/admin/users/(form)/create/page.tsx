import type { Metadata } from 'next';
import { UserForm } from '../UserForm';

export const metadata: Metadata = {
  title: 'create',
};
console.log(metadata); // { title: 'create'

export default function CreateUserPage() {
  return <UserForm type="create" />;
}
