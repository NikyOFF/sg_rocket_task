import { ConsultationInterface } from '@modules/consultations/common/interfaces/consultation.interface';
import { UserInterface } from '@modules/users/common/interfaces/user.interface';
import { LawyerInterface } from '@modules/users/common/interfaces/lawyer.interface';

export class AfterConsultationCreateEvent {
  public constructor(
    public readonly user: UserInterface,
    public readonly lawyer: LawyerInterface,
    public readonly consultation: ConsultationInterface,
  ) {}
}
