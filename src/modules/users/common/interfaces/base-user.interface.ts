import { UserPermissionsBitField } from '@modules/users/common/utils/user-permissions.bit-field';

export interface BaseUserInterface {
  id: string;
  telephone: string;
  password: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  permissions: UserPermissionsBitField;
}
