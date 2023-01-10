import { BaseUsersServiceInterface } from '@modules/users/common/interfaces/base-users-service.interface';
import { UsersServiceInterface } from '@modules/users/common/interfaces/users-service.interface';
import { LawyersServiceInterface } from '@modules/users/common/interfaces/lawyers-service.interface';
import { CreateUserDataType } from '@modules/users/common/types/create-user-data.type';
import { BaseUserInterface } from '@modules/users/common/interfaces/base-user.interface';

export interface GeneralUsersServiceInterface {
  baseUsersService: BaseUsersServiceInterface;
  usersService: UsersServiceInterface;
  lawyersService: LawyersServiceInterface;

  createUser(data: CreateUserDataType): Promise<BaseUserInterface>;
}
