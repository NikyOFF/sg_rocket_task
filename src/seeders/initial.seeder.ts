import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';

@Injectable()
export class InitialSeeder implements Seeder {
  public async seed(): Promise<void> {}

  public async drop(): Promise<void> {}
}
