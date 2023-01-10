import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthStrategyTypeEnum } from '@modules/auth/common/enums/auth-strategy-type.enum';
import { Inject, Injectable } from '@nestjs/common';
import AuthConfig from '@modules/auth/config/auth-config.loader';
import { ConfigType } from '@nestjs/config';
import BaseUsersService from '@modules/users/services/base-users';
import { BaseUsersServiceInterface } from '@modules/users/common/interfaces/base-users-service.interface';
import { AccessJwtPayloadInterface } from '@modules/auth/common/interfaces/access-jwt-payload.interface';
import { BaseUserInterface } from '@modules/users/common/interfaces/base-user.interface';

@Injectable()
export class BaseUserJwtStrategy extends PassportStrategy(
  Strategy,
  AuthStrategyTypeEnum.BASE_USER_JWT,
) {
  public constructor(
    @Inject(AuthConfig.KEY)
    public readonly authConfig: ConfigType<typeof AuthConfig>,
    @Inject(BaseUsersService.TOKEN)
    public readonly baseUsersService: BaseUsersServiceInterface,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.accessToken.secretKey,
    });
  }

  public async validate(
    payload: AccessJwtPayloadInterface,
  ): Promise<BaseUserInterface> {
    return this.baseUsersService.findOne({
      where: {
        id: payload.sub,
      },
    });
  }
}
