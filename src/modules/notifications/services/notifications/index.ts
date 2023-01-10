import { registerServiceProvider } from '@packages/nest-service-provider/register-service-provider.util';
import { NotificationsServiceInterface } from '@modules/notifications/common/interfaces/notifications-service.interface';
import { NotificationsService } from '@modules/notifications/services/notifications/notifications.service';

export default registerServiceProvider<NotificationsServiceInterface>(
  'NOTIFICATIONS_SERVICE',
  NotificationsService,
);
