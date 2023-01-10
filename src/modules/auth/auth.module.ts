import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import AuthConfig from '@modules/auth/config/auth-config.loader';
import AuthService from '@modules/auth/services/auth';
import { BcryptModule } from '@packages/bcrypt/bcrypt.module';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '@modules/users/users.module';
import { BcryptUserSubscriber } from '@modules/auth/subscribers/bcrypt-user.subscriber';
import { BaseUserJwtStrategy } from '@modules/auth/strategies/base-user-jwt.strategy';
import { AuthController } from '@modules/auth/controllers/auth.controller';

@Module({
  imports: [
    ConfigModule.forFeature(AuthConfig),
    BcryptModule.forRootAsync({
      imports: [ConfigModule.forFeature(AuthConfig)],
      useFactory: async (authConfig: ConfigType<typeof AuthConfig>) => ({
        secret: authConfig.hashSecret,
      }),
      inject: [AuthConfig.KEY],
    }),
    PassportModule,
    UsersModule,
  ],
  providers: [BcryptUserSubscriber, AuthService.PROVIDER, BaseUserJwtStrategy],
  controllers: [AuthController],
  exports: [AuthService.PROVIDER],
})
export class AuthModule {}
