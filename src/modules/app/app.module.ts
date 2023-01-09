import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfigKeyEnum } from '@common/enums/environment-config-key.enum';
import { AgendaModule } from 'nestjs-agenda';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
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
    AgendaModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        db: { address: config.get(EnvironmentConfigKeyEnum.MONGODB_HOST) },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
