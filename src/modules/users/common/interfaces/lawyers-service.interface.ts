import { TypeormServiceInterface } from '@packages/typeorm/service/service.interface';
import { LawyerInterface } from '@modules/users/common/interfaces/lawyer.interface';
import { LawyerRepository } from '@modules/users/lawyer/lawyer.repository';

export type LawyersServiceInterface = TypeormServiceInterface<
  LawyerInterface,
  LawyerRepository
>;
