import { BaseUserInterface } from '@modules/users/common/interfaces/base-user.interface';
import { CreateUserDataType } from '@modules/users/common/types/create-user-data.type';
import { UserTypeEnum } from '@modules/users/common/enums/user-type.enum';
import { GeneralUsersServiceInterface } from '@modules/users/common/interfaces/general-users-service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { BaseUsersServiceInterface } from '@modules/users/common/interfaces/base-users-service.interface';
import { LawyersServiceInterface } from '@modules/users/common/interfaces/lawyers-service.interface';
import { UsersServiceInterface } from '@modules/users/common/interfaces/users-service.interface';
import BaseUsersService from '@modules/users/services/base-users';
import UsersService from '@modules/users/services/users';
import LawyersService from '@modules/users/services/lawyers';

@Injectable()
export class GeneralUsersService implements GeneralUsersServiceInterface {
  public constructor(
    @Inject(BaseUsersService.TOKEN)
    public readonly baseUsersService: BaseUsersServiceInterface,
    @Inject(UsersService.TOKEN)
    public readonly usersService: UsersServiceInterface,
    @Inject(LawyersService.TOKEN)
    public readonly lawyersService: LawyersServiceInterface,
  ) {}

  public async createUser(
    data: CreateUserDataType,
  ): Promise<BaseUserInterface> {
    const { userType, ...userData } = data;
    let user: BaseUserInterface;

    switch (userType) {
      case UserTypeEnum.USER:
        user = await this.usersService.createOne(userData);
        break;
      case UserTypeEnum.LAWYER:
        user = await this.lawyersService.createOne(userData);
        break;
    }

    return user;
  }
}
