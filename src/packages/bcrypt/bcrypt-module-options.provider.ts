import { Provider } from '@nestjs/common';
import {
  BcryptModuleAsyncOptionsInterface,
  BcryptModuleOptionsInterface,
  BcryptModuleOptionsFactory,
} from './bcrypt-module-options.interface';

export const BCRYPT_MODULE_OPTIONS_TOKEN = Symbol('BCRYPT_MODULE_OPTIONS');

export function bcryptModuleOptionsProvider(
  options: BcryptModuleOptionsInterface,
): Provider {
  return {
    provide: BCRYPT_MODULE_OPTIONS_TOKEN,
    useValue: options,
  };
}

export function bcryptModuleAsyncOptionsProviders(
  options: BcryptModuleAsyncOptionsInterface,
): Provider[] {
  if (options.useExisting || options.useFactory) {
    return [bcryptModuleAsyncOptionsProvider(options)];
  }

  return [
    bcryptModuleAsyncOptionsProvider(options),
    {
      provide: options.useClass,
      useClass: options.useClass,
    },
  ];
}

export function bcryptModuleAsyncOptionsProvider(
  options: BcryptModuleAsyncOptionsInterface,
): Provider {
  if (options.useFactory) {
    return {
      provide: BCRYPT_MODULE_OPTIONS_TOKEN,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }

  return {
    provide: BCRYPT_MODULE_OPTIONS_TOKEN,
    useFactory: async (optionsFactory: BcryptModuleOptionsFactory) => {
      return optionsFactory.createBcryptModuleOptions();
    },
    inject: [options.useExisting || options.useClass],
  };
}
