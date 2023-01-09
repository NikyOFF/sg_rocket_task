import { DynamicModule, Global, Module } from '@nestjs/common';
import {
  RedisModuleAsyncOptionsInterface,
  RedisModuleOptionsInterface,
} from './redis-module-options.interface';
import {
  createRedisModuleAsyncOptionsProviders,
  createRedisModuleOptionsProvider,
} from './redis-module-options.provider';
import {
  createRedisModuleAsyncConnectionProvider,
  createRedisModuleConnectionProvider,
} from './redis-module-connection.provider';

@Global()
@Module({})
export class RedisCoreModule {
  public static forRoot(
    options: RedisModuleOptionsInterface,
    connection?: string,
  ): DynamicModule {
    const redisModuleOptionsProvider = createRedisModuleOptionsProvider(
      options,
      connection,
    );

    const redisModuleConnectionProvider = createRedisModuleConnectionProvider(
      options,
      connection,
    );

    return {
      module: RedisCoreModule,
      providers: [redisModuleOptionsProvider, redisModuleConnectionProvider],
      exports: [redisModuleConnectionProvider],
    };
  }

  public static forRootAsync(
    options: RedisModuleAsyncOptionsInterface,
    connection: string,
  ): DynamicModule {
    const redisModuleConnectionProvider =
      createRedisModuleAsyncConnectionProvider(options, connection);

    return {
      module: RedisCoreModule,
      providers: [
        ...createRedisModuleAsyncOptionsProviders(options, connection),
        redisModuleConnectionProvider,
      ],
      exports: [redisModuleConnectionProvider],
    };
  }
}
