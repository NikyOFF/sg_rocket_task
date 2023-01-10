import { TypeormService } from '@packages/typeorm/service/service.abstract';
import { UserInterface } from '@modules/users/common/interfaces/user.interface';
import { UserRepository } from '@modules/users/user/user.repository';
import { UserEntity } from '@modules/users/user/user.entity';
import { UsersServiceInterface } from '@modules/users/common/interfaces/users-service.interface';

export class UsersService
  extends TypeormService<UserInterface, UserRepository>(UserEntity)
  implements UsersServiceInterface {}
