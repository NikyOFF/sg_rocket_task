import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseUserEntity } from '@modules/users/base-user/base-user.entity';
import { UserEntity } from '@modules/users/user/user.entity';
import { LawyerEntity } from '@modules/users/lawyer/lawyer.entity';
import BaseUsersService from '@modules/users/services/base-users';
import UsersService from '@modules/users/services/users';
import LawyersService from '@modules/users/services/lawyers';
import GeneralUsersService from '@modules/users/services/general-users';

@Module({
  imports: [
    TypeOrmModule.forFeature([BaseUserEntity, UserEntity, LawyerEntity]),
  ],
  providers: [
    BaseUsersService.PROVIDER,
    UsersService.PROVIDER,
    LawyersService.PROVIDER,
    GeneralUsersService.PROVIDER,
  ],
  exports: [
    TypeOrmModule,
    BaseUsersService.PROVIDER,
    UsersService.PROVIDER,
    LawyersService.PROVIDER,
    GeneralUsersService.PROVIDER,
  ],
})
export class UsersModule {}
