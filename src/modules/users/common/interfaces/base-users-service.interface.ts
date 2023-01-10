import { TypeormServiceInterface } from '@packages/typeorm/service/service.interface';
import { BaseUserInterface } from '@modules/users/common/interfaces/base-user.interface';
import { BaseUserRepository } from '@modules/users/base-user/base-user.repository';

export type BaseUsersServiceInterface = TypeormServiceInterface<
  BaseUserInterface,
  BaseUserRepository
>;
