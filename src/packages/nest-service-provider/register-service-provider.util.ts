import { Type } from '@nestjs/common';
import { ServiceProvider } from './service-provider.interface';

export function registerServiceProvider<T = any>(
  token: string,
  classRef: Type<T>,
): ServiceProvider<T> {
  const serviceToken = Symbol(token);

  return {
    TOKEN: serviceToken,
    PROVIDER: {
      provide: serviceToken,
      useClass: classRef,
    },
  };
}
