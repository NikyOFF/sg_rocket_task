import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategyTypeEnum } from '@modules/auth/common/enums/auth-strategy-type.enum';
import { LawyerEntity } from '@modules/users/lawyer/lawyer.entity';

@Injectable()
export class LawyerJwtAuthGuard extends AuthGuard(
  AuthStrategyTypeEnum.BASE_USER_JWT,
) {
  public constructor() {
    super({
      property: 'user',
    });
  }

  public handleRequest(err, user, info): any {
    if (err || !user || !(user instanceof LawyerEntity)) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
