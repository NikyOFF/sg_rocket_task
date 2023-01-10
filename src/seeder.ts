import { seeder } from 'nestjs-seeder';
import { InitialSeeder } from '@/seeders/initial.seeder';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfigKeyEnum } from '@common/enums/environment-config-key.enum';
import SeederConfig from '@/seeders/config/seeder-config.loader';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { AgendaModule } from '@packages/agenda/agenda.module';
import { NotificationsModule } from '@modules/notifications/notifications.module';
import { ConsultationsModule } from '@modules/consultations/consultations.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

seeder({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    ConfigModule.forFeature(SeederConfig),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>(EnvironmentConfigKeyEnum.ORM_HOST),
        port: configService.get<number>(EnvironmentConfigKeyEnum.ORM_PORT),
        username: configService.get<string>(
          EnvironmentConfigKeyEnum.ORM_USERNAME,
        ),
        password: configService.get<string>(
          EnvironmentConfigKeyEnum.ORM_PASSWORD,
        ),
        database: configService.get<string>(
          EnvironmentConfigKeyEnum.ORM_DATABASE,
        ),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AgendaModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        db: { address: config.get(EnvironmentConfigKeyEnum.MONGODB_HOST) },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    NotificationsModule,
    ConsultationsModule,
  ],
}).run([InitialSeeder]);
