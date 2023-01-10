import { NotificationType } from '@modules/notifications/common/types/notification.type';

export interface NotificationsServiceInterface {
  notify(notification: NotificationType): Promise<void>;
}
