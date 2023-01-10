import { Inject, Injectable } from '@nestjs/common';
import { ConsultationEventEnum } from '@modules/consultations/events/consultation-event.enum';
import { NotificationsServiceInterface } from '@modules/notifications/common/interfaces/notifications-service.interface';
import NotificationsService from '@modules/notifications/services/notifications';
import { AfterConsultationCreateEvent } from '@modules/consultations/events/after-consultation-create.event';
import { OnEvent } from '@nestjs/event-emitter';
import GeneralUsersService from '@modules/users/services/general-users';
import { GeneralUsersServiceInterface } from '@modules/users/common/interfaces/general-users-service.interface';

@Injectable()
export class ConsultationEventsListener {
  public constructor(
    @Inject(NotificationsService.TOKEN)
    private readonly notificationsService: NotificationsServiceInterface,
    @Inject(GeneralUsersService.TOKEN)
    private readonly generalUsersService: GeneralUsersServiceInterface,
  ) {}

  @OnEvent(ConsultationEventEnum.AFTER_CONSULTATION_CREATE)
  public async handleAfterConsultationCreateEvent(
    event: AfterConsultationCreateEvent,
  ): Promise<void> {
    const startDate = new Date(event.consultation.startAt);

    await this.notificationsService.notify({
      type: 'console',
      message: `${Date.now()} | Привет ${event.user.firstName}. Напоминаем о консультации с юристом ${event.lawyer.firstName} завтра в ${startDate.getHours()}:${startDate.getMinutes()}`,
      when: new Date(event.consultation.startAt - 86_400_000),
    });

    await this.notificationsService.notify({
      type: 'console',
      message: `${Date.now()} | Привет ${event.user.firstName}. Через 2 часа у Вас консультация с юристом ${event.lawyer.firstName}`,
      when: new Date(event.consultation.startAt - 7_200_000),
    });
  }
}
