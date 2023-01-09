import { RedisOptions } from 'ioredis';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export type RedisModuleOptionsInterface = RedisOptions & { path?: string };

export interface RedisModuleOptionsFactory {
  createOptions():
    | Promise<RedisModuleOptionsInterface>
    | RedisModuleOptionsInterface;
}

export interface RedisModuleAsyncOptionsInterface
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<RedisModuleOptionsFactory>;
  useClass?: Type<RedisModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<RedisModuleOptionsInterface> | RedisModuleOptionsInterface;
  inject?: any[];
}
