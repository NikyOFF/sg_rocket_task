import { UserRepository } from '../../user/user.repository';
import { UserInterface } from './user.interface';
import { TypeormServiceInterface } from '@packages/typeorm/service/service.interface';

export type UsersServiceInterface = TypeormServiceInterface<
  UserInterface,
  UserRepository
>;
