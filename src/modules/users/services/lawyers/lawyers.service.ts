import { TypeormService } from '@packages/typeorm/service/service.abstract';
import { LawyerInterface } from '@modules/users/common/interfaces/lawyer.interface';
import { LawyerRepository } from '@modules/users/lawyer/lawyer.repository';
import { LawyerEntity } from '@modules/users/lawyer/lawyer.entity';
import { LawyersServiceInterface } from '@modules/users/common/interfaces/lawyers-service.interface';

export class LawyersService
  extends TypeormService<LawyerInterface, LawyerRepository>(LawyerEntity)
  implements LawyersServiceInterface {}
