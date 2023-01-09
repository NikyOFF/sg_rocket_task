import {
  RedisModuleAsyncOptionsInterface,
  RedisModuleOptionsInterface,
} from './redis-module-options.interface';
import { Provider } from '@nestjs/common';
import {
  createRedisConnection,
  getRedisConnectionToken,
  getRedisOptionsToken,
} from './redis-module.utils';

export const REDIS_MODULE_CONNECTION_TOKEN = Symbol(
  'REDIS_MODULE_CONNECTION_TOKEN',
);

export function createRedisModuleConnectionProvider(
  options: RedisModuleOptionsInterface,
  connection?: string,
): Provider {
  return {
    provide: getRedisConnectionToken(connection),
    useValue: createRedisConnection(options),
  };
}

export function createRedisModuleAsyncConnectionProvider(
  options: RedisModuleAsyncOptionsInterface,
  connection?: string,
): Provider {
  return {
    provide: getRedisConnectionToken(connection),
    useFactory: (options: RedisModuleOptionsInterface) => {
      return createRedisConnection(options);
    },
    inject: [getRedisOptionsToken(connection)],
  };
}
