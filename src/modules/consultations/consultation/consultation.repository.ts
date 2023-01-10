import { Repository } from 'typeorm';
import { ConsultationInterface } from '@modules/consultations/common/interfaces/consultation.interface';

export type ConsultationRepository = Repository<ConsultationInterface>;
