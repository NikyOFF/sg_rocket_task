import { TypeormService } from '@packages/typeorm/service/service.abstract';
import { BaseUserInterface } from '@modules/users/common/interfaces/base-user.interface';
import { BaseUserRepository } from '@modules/users/base-user/base-user.repository';
import { BaseUserEntity } from '@modules/users/base-user/base-user.entity';
import { BaseUsersServiceInterface } from '@modules/users/common/interfaces/base-users-service.interface';

export class BaseUsersService
  extends TypeormService<BaseUserInterface, BaseUserRepository>(BaseUserEntity)
  implements BaseUsersServiceInterface {}
