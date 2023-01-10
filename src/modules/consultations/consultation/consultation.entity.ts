import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConsultationInterface } from '@modules/consultations/common/interfaces/consultation.interface';
import { UserInterface } from '@modules/users/common/interfaces/user.interface';
import { UserEntity } from '@modules/users/user/user.entity';
import { LawyerEntity } from '@modules/users/lawyer/lawyer.entity';
import { LawyerInterface } from '@modules/users/common/interfaces/lawyer.interface';

@Entity({ name: 'consultations' })
export class ConsultationEntity
  extends BaseEntity
  implements ConsultationInterface
{
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ name: 'lawyer_id', type: 'uuid' })
  public lawyerId!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  public userId!: string;

  @Column({
    name: 'start_at',
    type: 'bigint',
    transformer: {
      from: (value: string) => parseInt(value),
      to: (value: bigint) => value.toString(),
    },
  })
  public startAt!: number;

  @ManyToOne(() => LawyerEntity, (entity) => entity.consultations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lawyer_id', referencedColumnName: 'id' })
  public lawyer: LawyerInterface;

  @ManyToOne(() => UserEntity, (entity) => entity.consultations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  public user: UserInterface;
}
