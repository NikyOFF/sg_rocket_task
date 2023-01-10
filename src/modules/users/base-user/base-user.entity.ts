import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { BaseUserInterface } from '@modules/users/common/interfaces/base-user.interface';
import { UserPermissionsBitField } from '@modules/users/common/utils/user-permissions.bit-field';

@Entity()
@TableInheritance({
  column: { type: 'varchar', name: 'user_type' },
})
export class BaseUserEntity extends BaseEntity implements BaseUserInterface {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ name: 'telephone', type: 'varchar' })
  public telephone!: string;

  @Column({ name: 'password', type: 'varchar' })
  public password!: string;

  @Column({ name: 'first_name', type: 'varchar' })
  public firstName!: string;

  @Column({ name: 'last_name', type: 'varchar' })
  public lastName!: string;

  @Column({ name: 'patronymic', type: 'varchar' })
  public patronymic!: string;

  @Column({
    name: 'permissions',
    type: 'int',
    transformer: {
      from: (value: number) => new UserPermissionsBitField(value),
      to: (value: UserPermissionsBitField) => Number(value.bitfield),
    },
  })
  public permissions!: UserPermissionsBitField;
}
