import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategyTypeEnum } from '@modules/auth/common/enums/auth-strategy-type.enum';

@Injectable()
export class BaseUserJwtAuthGuard extends AuthGuard(
  AuthStrategyTypeEnum.BASE_USER_JWT,
) {
  public constructor() {
    super({
      property: 'user',
    });
  }
}
