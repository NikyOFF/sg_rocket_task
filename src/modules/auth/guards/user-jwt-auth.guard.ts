import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategyTypeEnum } from '@modules/auth/common/enums/auth-strategy-type.enum';
import { UserEntity } from '@modules/users/user/user.entity';

@Injectable()
export class UserJwtAuthGuard extends AuthGuard(AuthStrategyTypeEnum.BASE_USER_JWT) {
  public constructor() {
    super({
      property: 'user',
    });
  }

  public handleRequest(err, user, info): any {
    if (err || !user || !(user instanceof UserEntity)) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
