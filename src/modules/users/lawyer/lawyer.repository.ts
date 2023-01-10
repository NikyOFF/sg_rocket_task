import { Repository } from 'typeorm';
import { LawyerInterface } from '@modules/users/common/interfaces/lawyer.interface';

export type LawyerRepository = Repository<LawyerInterface>;
