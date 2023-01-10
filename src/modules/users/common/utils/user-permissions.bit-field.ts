import { BitField } from '@packages/bit-field/bit-field';
import { UserPermissionEnum } from '@modules/users/common/enums/user-permission.enum';

export class UserPermissionsBitField extends BitField<UserPermissionEnum> {
  static FLAGS = UserPermissionEnum;
}
