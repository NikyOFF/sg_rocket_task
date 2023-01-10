import { ChildEntity, Column, OneToMany } from 'typeorm';
import { LawyerInterface } from '@modules/users/common/interfaces/lawyer.interface';
import { BaseUserEntity } from '@modules/users/base-user/base-user.entity';
import { ConsultationInterface } from '@modules/consultations/common/interfaces/consultation.interface';
import { ConsultationEntity } from '@modules/consultations/consultation/consultation.entity';
import { LawBranchBitField } from '@common/utils/law-branch.bit-field';

@ChildEntity()
export class LawyerEntity extends BaseUserEntity implements LawyerInterface {
  @Column({
    name: 'law_branches',
    type: 'int',
    transformer: {
      from: (value: number) => new LawBranchBitField(value),
      to: (value: LawBranchBitField) => Number(value.bitfield),
    },
  })
  public lawBranches!: LawBranchBitField;

  @OneToMany(() => ConsultationEntity, (entity) => entity.lawyer)
  public consultations: ConsultationInterface[];
}
