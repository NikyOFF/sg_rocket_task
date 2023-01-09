import { Inject } from '@nestjs/common';
import { getRedisConnectionToken } from './redis-module.utils';

export const InjectRedis = (connection?: string) => {
  return Inject(getRedisConnectionToken(connection));
};
