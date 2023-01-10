import { AuthServiceInterface } from '@modules/auth/common/interfaces/auth-service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { SignUpUserDto } from '@modules/auth/common/dto/sign-up-user.dto';
import { AccessTokenDto } from '@modules/auth/common/dto/access-token.dto';
import { TokenDataInterface } from '@modules/auth/common/interfaces/token-data.interface';
import { TokenOptionsInterface } from '@modules/auth/common/interfaces/token-options.interface';
import AuthConfig from '@modules/auth/config/auth-config.loader';
import { ConfigType } from '@nestjs/config';
import jwt from 'jsonwebtoken';
import { SignInDto } from '@modules/auth/common/dto/sign-in.dto';
import { BCRYPT_SERVICE_TOKEN } from '@packages/bcrypt/bcrypt-service.provider';
import { BcryptServiceInterface } from '@packages/bcrypt/bcrypt-service.interface';
import { GeneralUsersServiceInterface } from '@modules/users/common/interfaces/general-users-service.interface';
import GeneralUsersService from '@modules/users/services/general-users';
import { UserTypeEnum } from '@modules/users/common/enums/user-type.enum';
import { UserPermissionsBitField } from '@modules/users/common/utils/user-permissions.bit-field';
import { SignUpLawyerDto } from '@modules/auth/common/dto/sign-up-lawyer.dto';
import { BaseUserInterface } from '@modules/users/common/interfaces/base-user.interface';
import { LawBranchBitField } from '@common/utils/law-branch.bit-field';

@Injectable()
export class AuthService implements AuthServiceInterface {
  public constructor(
    @Inject(AuthConfig.KEY)
    private readonly authConfig: ConfigType<typeof AuthConfig>,
    @Inject(BCRYPT_SERVICE_TOKEN)
    public readonly bcryptService: BcryptServiceInterface,
    @Inject(GeneralUsersService.TOKEN)
    private readonly generalUsersService: GeneralUsersServiceInterface,
  ) {}

  public async signUp(
    data: SignUpUserDto | SignUpLawyerDto,
  ): Promise<AccessTokenDto> {
    const userExists =
      (await this.generalUsersService.baseUsersService.count({
        where: {
          telephone: data.telephone,
        },
      })) > 0;

    if (userExists) {
      throw new Error('User already exist');
    }

    let user: BaseUserInterface;

    switch (true) {
      case data instanceof SignUpUserDto:
        user = await this.generalUsersService.createUser({
          userType: UserTypeEnum.USER,
          telephone: data.telephone,
          password: data.password,
          firstName: data.fistName,
          lastName: data.lastName,
          patronymic: data.patronymic,
          permissions: new UserPermissionsBitField(),
        });

        break;
      case data instanceof SignUpLawyerDto:
        const lawyerData = data as SignUpLawyerDto;

        user = await this.generalUsersService.createUser({
          userType: UserTypeEnum.LAWYER,
          telephone: lawyerData.telephone,
          password: lawyerData.password,
          firstName: lawyerData.fistName,
          lastName: lawyerData.lastName,
          patronymic: lawyerData.patronymic,
          permissions: new UserPermissionsBitField(),
          lawBranches: new LawBranchBitField(lawyerData.lawBranches),
        });

        break;
    }

    const accessToken = this.generateAccessToken(
      user.id,
      user['constructor']!.name,
    );

    return {
      accessToken: accessToken.value,
      tokenType: 'bearer',
      expiresIn: accessToken.expiresIn,
    };
  }

  public async signIn(data: SignInDto): Promise<AccessTokenDto> {
    const candidate = await this.generalUsersService.baseUsersService.findOne({
      where: {
        telephone: data.telephone,
      },
    });

    if (!candidate) {
      throw new Error('Unknown user');
    }

    const passwordMatch = await this.bcryptService.compare(
      data.password,
      candidate.password,
    );

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    const accessToken = this.generateAccessToken(
      candidate.id,
      candidate['constructor']!.name,
    );

    return {
      accessToken: accessToken.value,
      tokenType: 'bearer',
      expiresIn: accessToken.expiresIn,
    };
  }

  private generateTokenByConfig(
    config: TokenOptionsInterface,
    body: object,
    options?: Omit<jwt.SignOptions, 'jwtid' | 'algorithm' | 'expiresIn'>,
  ): TokenDataInterface {
    const jti = Date.now().toString();

    const token: string = jwt.sign(body, config.secretKey, {
      algorithm: config.algorithm,
      expiresIn: `${config.expiresIn}ms`,
      jwtid: jti,
      ...options,
    });

    return {
      value: token,
      algorithm: config.algorithm,
      expiresIn: config.expiresIn,
      jwtid: jti,
    };
  }

  private generateAccessToken(
    userId: string,
    userType: string,
  ): TokenDataInterface {
    return this.generateTokenByConfig(
      this.authConfig.accessToken,
      {
        userType: userType,
      },
      {
        subject: userId,
      },
    );
  }
}
