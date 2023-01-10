import { JwtPayload } from 'jsonwebtoken';
import { UserTypeEnum } from '@modules/users/common/enums/user-type.enum';

export interface AccessJwtPayloadInterface extends JwtPayload {
  userType: UserTypeEnum;
  sub: string;
}
