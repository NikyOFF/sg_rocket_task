import { Module } from '@nestjs/common';
import NotificationsService from '@modules/notifications/services/notifications';
import { ConsoleNotificationSequencer } from '@modules/notifications/sequencers/console-notification.sequencer';

@Module({
  imports: [],
  providers: [NotificationsService.PROVIDER, ConsoleNotificationSequencer],
  exports: [NotificationsService.PROVIDER],
})
export class NotificationsModule {}
