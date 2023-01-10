import { Repository } from 'typeorm';
import { UserInterface } from '@modules/users/common/interfaces/user.interface';

export type UserRepository = Repository<UserInterface>;
