import { TypeormServiceInterface } from '@packages/typeorm/service/service.interface';
import { ConsultationInterface } from '@modules/consultations/common/interfaces/consultation.interface';
import { ConsultationRepository } from '@modules/consultations/consultation/consultation.repository';
import { CreateConsultationDto } from '@modules/consultations/common/dto/create-consultation.dto';
import { UserInterface } from '@modules/users/common/interfaces/user.interface';

export interface ConsultationsServiceInterface
  extends TypeormServiceInterface<
    ConsultationInterface,
    ConsultationRepository
  > {
  createConsultations(
    user: UserInterface,
    data: CreateConsultationDto,
  ): Promise<ConsultationInterface>;
}
