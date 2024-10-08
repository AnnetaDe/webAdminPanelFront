import type { Metadata } from 'next';
import { UserForm } from '../../UserForm';

export const metadata: Metadata = {
  title: 'User Edit',
};

export default function EditUserPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <UserForm type="edit" id={id} />;
}
