import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationEntity } from '@modules/consultations/consultation/consultation.entity';
import ConsultationsService from '@modules/consultations/services/consultations';
import { NotificationsModule } from '@modules/notifications/notifications.module';
import { ConfigModule } from '@nestjs/config';
import ConsultationsConfig from '@modules/consultations/config/consultations-config.loader';
import { UsersModule } from '@modules/users/users.module';
import { ConsultationEventsListener } from '@modules/consultations/listeners/consultation-events.listener';
import { ConsultationsController } from '@modules/consultations/controllers/consultations.controller';

@Module({
  imports: [
    ConfigModule.forFeature(ConsultationsConfig),
    TypeOrmModule.forFeature([ConsultationEntity]),
    NotificationsModule,
    UsersModule,
  ],
  providers: [ConsultationsService.PROVIDER, ConsultationEventsListener],
  controllers: [ConsultationsController],
  exports: [TypeOrmModule, ConsultationsService.PROVIDER],
})
export class ConsultationsModule {}
