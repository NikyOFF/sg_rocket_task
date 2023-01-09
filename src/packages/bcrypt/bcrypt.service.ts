import { Inject, Injectable } from '@nestjs/common';
import { genSaltSync, hashSync, hash, compareSync, compare } from 'bcrypt';
import { BcryptServiceInterface } from './bcrypt-service.interface';
import { BCRYPT_MODULE_OPTIONS_TOKEN } from './bcrypt-module-options.provider';
import { BcryptModuleOptionsInterface } from './bcrypt-module-options.interface';

@Injectable()
export class BcryptService implements BcryptServiceInterface {
  public constructor(
    @Inject(BCRYPT_MODULE_OPTIONS_TOKEN)
    protected readonly options: BcryptModuleOptionsInterface,
  ) {}

  public async hash(data: string): Promise<string> {
    return hash(this.getSecretData(data), this.getSaltOrRound());
  }

  public hashSync(data: string): string {
    return hashSync(this.getSecretData(data), this.getSaltOrRound());
  }

  public async compare(data: string, encrypted: string): Promise<boolean> {
    return compare(this.getSecretData(data), encrypted);
  }

  public compareSync(data: string, encrypted: string): boolean {
    return compareSync(this.getSecretData(data), encrypted);
  }

  protected getSecretData(data: string): string {
    return `${data}${this.options.secret || ''}`;
  }

  protected getSaltOrRound(): string | number {
    return this.options.saltOrRounds || genSaltSync();
  }
}
