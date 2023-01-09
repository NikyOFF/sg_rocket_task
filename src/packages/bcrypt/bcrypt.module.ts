import { DynamicModule, Module } from '@nestjs/common';
import {
  BcryptModuleAsyncOptionsInterface,
  BcryptModuleOptionsInterface,
} from './bcrypt-module-options.interface';
import {
  bcryptModuleAsyncOptionsProviders,
  bcryptModuleOptionsProvider,
} from './bcrypt-module-options.provider';
import { bcryptServiceProvider } from './bcrypt-service.provider';

@Module({})
export class BcryptModule {
  public static forRoot(options: BcryptModuleOptionsInterface): DynamicModule {
    return {
      module: BcryptModule,
      providers: [bcryptModuleOptionsProvider(options), bcryptServiceProvider],
      exports: [bcryptServiceProvider],
    };
  }

  public static forRootAsync(
    options: BcryptModuleAsyncOptionsInterface,
  ): DynamicModule {
    return {
      module: BcryptModule,
      imports: options.imports,
      providers: [
        ...bcryptModuleAsyncOptionsProviders(options),
        bcryptServiceProvider,
      ],
      exports: [bcryptServiceProvider],
    };
  }
}
