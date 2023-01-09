import { Provider } from '@nestjs/common';
import {
  RedisModuleAsyncOptionsInterface,
  RedisModuleOptionsFactory,
  RedisModuleOptionsInterface,
} from './redis-module-options.interface';
import { getRedisOptionsToken } from './redis-module.utils';

export const REDIS_MODULE_OPTIONS_TOKEN = Symbol('REDIS_MODULE_OPTIONS');

export function createRedisModuleOptionsProvider(
  options: RedisModuleOptionsInterface,
  connection?: string,
): Provider {
  return {
    provide: getRedisOptionsToken(connection),
    useValue: options,
  };
}

export function createRedisModuleAsyncOptionsProviders(
  options: RedisModuleAsyncOptionsInterface,
  connection?: string,
): Provider[] {
  if (options.useExisting || options.useFactory) {
    return [createRedisModuleAsyncOptionsProvider(options, connection)];
  }

  return [
    createRedisModuleAsyncOptionsProvider(options, connection),
    {
      provide: options.useClass,
      useClass: options.useClass,
    },
  ];
}

export function createRedisModuleAsyncOptionsProvider(
  options: RedisModuleAsyncOptionsInterface,
  connection: string,
): Provider {
  if (options.useFactory) {
    return {
      provide: getRedisOptionsToken(connection),
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }

  return {
    provide: getRedisOptionsToken(connection),
    useFactory: async (
      optionsFactory: RedisModuleOptionsFactory,
    ): Promise<RedisModuleOptionsInterface> => {
      return optionsFactory.createOptions();
    },
    inject: [options.useExisting || options.useClass],
  };
}
