import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface BcryptModuleOptionsInterface {
  saltOrRounds?: string | number;
  secret?: string;
}

export interface BcryptModuleOptionsFactory {
  createBcryptModuleOptions():
    | Promise<BcryptModuleOptionsInterface>
    | BcryptModuleOptionsInterface;
}

export interface BcryptModuleAsyncOptionsInterface
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<BcryptModuleOptionsFactory>;
  useClass?: Type<BcryptModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<BcryptModuleOptionsInterface> | BcryptModuleOptionsInterface;
  inject?: any[];
}
