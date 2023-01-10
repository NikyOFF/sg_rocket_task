import { UserTypeEnum } from '@modules/users/common/enums/user-type.enum';
import { UserInterface } from '@modules/users/common/interfaces/user.interface';
import { LawyerInterface } from '@modules/users/common/interfaces/lawyer.interface';

export type CreateUserDataType =
  | ({
      userType: UserTypeEnum.USER;
    } & Omit<UserInterface, 'id'>)
  | ({
      userType: UserTypeEnum.LAWYER;
    } & Omit<LawyerInterface, 'id'>);
