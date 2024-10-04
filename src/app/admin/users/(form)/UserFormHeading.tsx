import type { TypeUserForm } from './user-form.types';

export function UserFormHeading({
  type,
  email,
}: {
  type: TypeUserForm;
  email?: string;
}) {
  switch (type) {
    case 'create':
      return 'Create user';

    case 'edit':
      return `Edit "${email}"`;

    default:
      return 'Edit user';
  }
}
