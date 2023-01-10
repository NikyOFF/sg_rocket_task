import { Repository } from 'typeorm';
import { BaseUserInterface } from '@modules/users/common/interfaces/base-user.interface';

export type BaseUserRepository = Repository<BaseUserInterface>;
