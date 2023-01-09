import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfigKeyEnum } from '@common/enums/environment-config-key.enum';
import { RedisDatabaseEnum } from '@common/enums/redis-database.enum';
import { RedisConnectionEnum } from '@common/enums/redis-connection.enum';
import { RedisModule } from '@packages/ioredis/redis.module';

@Module({
  imports: [
    RedisModule.forRootAsync(
      {
        useFactory: (configService: ConfigService) => ({
          host: configService.get<string>(EnvironmentConfigKeyEnum.REDIS_HOST),
          port: configService.get<number>(EnvironmentConfigKeyEnum.REDIS_PORT),
          db: RedisDatabaseEnum.AUTH,
        }),
        inject: [ConfigService],
      },
      RedisConnectionEnum.AUTH,
    ),
  ],
  providers: [],
  exports: [],
})
export class RedisConnectorModule {}
