import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthServiceInterface } from '@modules/auth/common/interfaces/auth-service.interface';
import AuthService from '@modules/auth/services/auth';
import { AuthStrategyTypeEnum } from '@modules/auth/common/enums/auth-strategy-type.enum';
import { UserDto } from '@modules/users/common/dto/user.dto';
import { CurrentUser } from '@modules/auth/common/decorators/current-user.decorator';
import { BaseUserJwtAuthGuard } from '@modules/auth/guards/base-user-jwt-auth.guard';
import { AccessTokenDto } from '@modules/auth/common/dto/access-token.dto';
import { SignInDto } from '@modules/auth/common/dto/sign-in.dto';
import { BaseUserInterface } from '@modules/users/common/interfaces/base-user.interface';
import { SignUpUserDto } from '@modules/auth/common/dto/sign-up-user.dto';
import { SignUpLawyerDto } from '@modules/auth/common/dto/sign-up-lawyer.dto';

@Controller({
  path: 'auth',
  version: '1',
})
@ApiTags('auth')
export class AuthController {
  public constructor(
    @Inject(AuthService.TOKEN)
    public readonly authService: AuthServiceInterface,
  ) {}

  @Get('@me')
  @SerializeOptions({
    type: UserDto,
  })
  @UseGuards(BaseUserJwtAuthGuard)
  @ApiBearerAuth(AuthStrategyTypeEnum.BASE_USER_JWT)
  @ApiResponse({ type: UserDto, status: HttpStatus.OK })
  public async me(
    @CurrentUser() user: BaseUserInterface,
  ): Promise<BaseUserInterface> {
    return user;
  }

  @Post('sign-up-user')
  @SerializeOptions({
    type: AccessTokenDto,
  })
  @ApiBody({ type: SignUpUserDto })
  @ApiResponse({ type: AccessTokenDto, status: HttpStatus.OK })
  public async signUpUser(
    @Body() body: SignUpUserDto,
  ): Promise<AccessTokenDto> {
    return this.authService.signUp(body);
  }

  @Post('sign-up-lawyer')
  @SerializeOptions({
    type: AccessTokenDto,
  })
  @ApiBody({ type: SignUpLawyerDto })
  @ApiResponse({ type: AccessTokenDto, status: HttpStatus.OK })
  public async signUpLawyer(
    @Body() body: SignUpLawyerDto,
  ): Promise<AccessTokenDto> {
    return this.authService.signUp(body);
  }

  @Post('sign-in')
  @SerializeOptions({
    type: AccessTokenDto,
  })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ type: AccessTokenDto, status: HttpStatus.OK })
  public async signIn(@Body() body: SignInDto): Promise<AccessTokenDto> {
    return this.authService.signIn(body);
  }
}
