import { DynamicModule, Module } from '@nestjs/common';
import {
  RedisModuleAsyncOptionsInterface,
  RedisModuleOptionsInterface,
} from './redis-module-options.interface';
import { RedisCoreModule } from './redis.core-module';

@Module({})
export class RedisModule {
  public static forRoot(
    options: RedisModuleOptionsInterface,
    connection?: string,
  ): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRoot(options, connection)],
      exports: [RedisCoreModule],
    };
  }

  public static forRootAsync(
    options: RedisModuleAsyncOptionsInterface,
    connection?: string,
  ): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRootAsync(options, connection)],
      exports: [RedisCoreModule],
    };
  }
}
