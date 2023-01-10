import { Inject, Injectable } from '@nestjs/common';
import { DataFactory, Seeder } from 'nestjs-seeder';
import SeederConfig from '@/seeders/config/seeder-config.loader';
import { ConfigType } from '@nestjs/config';
import { BaseUserSchema } from '@/seeders/schemes/base-user.schema';
import { LawyerSchema } from '@/seeders/schemes/lawyer.schema';
import { GeneralUsersServiceInterface } from '@modules/users/common/interfaces/general-users-service.interface';
import GeneralUsersService from '@modules/users/services/general-users';
import ConsultationsService from '@modules/consultations/services/consultations';
import { ConsultationsServiceInterface } from '@modules/consultations/common/interfaces/consultations-service.interface';

export const USERS_TELEPHONES = new Set<string>();

@Injectable()
export class InitialSeeder implements Seeder {
  public constructor(
    @Inject(SeederConfig.KEY)
    private readonly seederConfig: ConfigType<typeof SeederConfig>,
    @Inject(GeneralUsersService.TOKEN)
    private readonly generalUsersService: GeneralUsersServiceInterface,
    @Inject(ConsultationsService.TOKEN)
    private readonly consultationsService: ConsultationsServiceInterface,
  ) {}

  public async seed(): Promise<void> {
    if (process.argv.includes('-r') || process.argv.includes('--refresh')) {
      return;
    }

    (
      await this.generalUsersService.baseUsersService.find({
        select: ['telephone'],
      })
    ).forEach((value) => USERS_TELEPHONES.add(value.telephone));

    await this.generalUsersService.usersService.repository.save(
      DataFactory.createForClass(BaseUserSchema).generate(
        Math.max(
          Math.ceil(Math.random() * this.seederConfig.maxUsersCount),
          this.seederConfig.minUsersCount,
        ),
      ),
    );

    await this.generalUsersService.lawyersService.repository.save(
      DataFactory.createForClass(LawyerSchema).generate(
        Math.max(
          Math.ceil(Math.random() * this.seederConfig.maxLawyersCount),
          this.seederConfig.minLawyersCount,
        ),
      ),
    );
  }

  public async drop(): Promise<void> {
    await this.generalUsersService.baseUsersService.delete({});
    await this.consultationsService.delete({});
  }
}
