import { TokenOptionsInterface } from '@modules/auth/common/interfaces/token-options.interface';
import { Expose } from 'class-transformer';
import { MsTransform } from '@common/transformers/ms.transform';
import { Algorithm } from 'jsonwebtoken';
import { DefaultTransform } from '@common/transformers/default.transform';

export class TokenOptionsConfig implements TokenOptionsInterface {
  @Expose()
  public secretKey: string;

  @Expose()
  @MsTransform()
  public expiresIn: number;

  @Expose()
  @DefaultTransform<Algorithm>('HS256')
  public algorithm: Algorithm;
}
