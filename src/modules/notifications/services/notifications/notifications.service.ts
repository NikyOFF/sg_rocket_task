import { NotificationsServiceInterface } from '@modules/notifications/common/interfaces/notifications-service.interface';
import { NotificationType } from '@modules/notifications/common/types/notification.type';
import { InjectAgenda } from '@packages/agenda/decorators/core/inject-agenda.decorator';
import Agenda from 'agenda';
import {
  CONSOLE_NOTIFICATION_JOB,
  ConsoleNotificationJobData,
} from '@modules/notifications/sequencers/console-notification.sequencer';

export class NotificationsService implements NotificationsServiceInterface {
  public constructor(
    @InjectAgenda()
    private readonly agenda: Agenda,
  ) {}

  public async notify(notification: NotificationType): Promise<void> {
    switch (notification.type) {
      case 'console':
        if (notification.when) {
          await this.agenda.schedule<ConsoleNotificationJobData>(
            notification.when,
            CONSOLE_NOTIFICATION_JOB,
            {
              message: notification.message,
            },
          );
          return;
        }

        await this.agenda.now<ConsoleNotificationJobData>(
          CONSOLE_NOTIFICATION_JOB,
          {
            message: notification.message,
          },
        );

        break;
      case 'email':
        throw new Error('Not implemented');
    }
  }
}
