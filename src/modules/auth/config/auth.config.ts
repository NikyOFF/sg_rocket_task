import { Expose, Type } from 'class-transformer';
import { TokenOptionsConfig } from '@modules/auth/config/token-options.config';

export class AuthConfig {
  @Expose()
  @Type(() => TokenOptionsConfig)
  public accessToken: TokenOptionsConfig;

  @Expose()
  public hashSecret: string;
}
