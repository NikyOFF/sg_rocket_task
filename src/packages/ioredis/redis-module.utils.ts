import Redis from 'ioredis';
import { REDIS_MODULE_OPTIONS_TOKEN } from './redis-module-options.provider';
import { RedisModuleOptionsInterface } from './redis-module-options.interface';
import { REDIS_MODULE_CONNECTION_TOKEN } from './redis-module-connection.provider';
import { REDIS_MODULE_CONNECTION } from './redis-module.constants';

export function getRedisOptionsToken(connection?: string): string {
  return `${
    connection || REDIS_MODULE_CONNECTION
  }_${REDIS_MODULE_OPTIONS_TOKEN.toString()}`;
}

export function getRedisConnectionToken(connection?: string): string {
  return `${
    connection || REDIS_MODULE_CONNECTION
  }_${REDIS_MODULE_CONNECTION_TOKEN.toString()}`;
}

export function createRedisConnection(options: RedisModuleOptionsInterface) {
  if (options.path) {
    return new Redis(options.path, options);
  } else {
    return new Redis(options);
  }
}
