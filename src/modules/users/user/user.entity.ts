import { UserInterface } from '@modules/users/common/interfaces/user.interface';
import { ChildEntity, OneToMany } from 'typeorm';
import { BaseUserEntity } from '@modules/users/base-user/base-user.entity';
import { ConsultationEntity } from '@modules/consultations/consultation/consultation.entity';
import { ConsultationInterface } from '@modules/consultations/common/interfaces/consultation.interface';

@ChildEntity()
export class UserEntity extends BaseUserEntity implements UserInterface {
  @OneToMany(() => ConsultationEntity, (entity) => entity.user)
  public consultations: ConsultationInterface[];
}
