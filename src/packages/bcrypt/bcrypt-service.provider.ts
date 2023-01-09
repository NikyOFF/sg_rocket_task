import { Provider } from '@nestjs/common';
import { BcryptServiceInterface } from './bcrypt-service.interface';
import { BcryptService } from './bcrypt.service';

export const BCRYPT_SERVICE_TOKEN = Symbol('BcryptServiceInterface');

export const bcryptServiceProvider: Provider<BcryptServiceInterface> = {
  provide: BCRYPT_SERVICE_TOKEN,
  useClass: BcryptService,
};
