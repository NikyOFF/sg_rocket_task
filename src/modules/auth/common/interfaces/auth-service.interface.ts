import { AccessTokenDto } from '../dto/access-token.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpUserDto } from '@modules/auth/common/dto/sign-up-user.dto';

export interface AuthServiceInterface {
  signUp(data: SignUpUserDto): Promise<AccessTokenDto>;

  signIn(data: SignInDto): Promise<AccessTokenDto>;
}
