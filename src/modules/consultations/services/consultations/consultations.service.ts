import { TypeormService } from '@packages/typeorm/service/service.abstract';
import { ConsultationInterface } from '@modules/consultations/common/interfaces/consultation.interface';
import { ConsultationRepository } from '@modules/consultations/consultation/consultation.repository';
import { ConsultationEntity } from '@modules/consultations/consultation/consultation.entity';
import { ConsultationsServiceInterface } from '@modules/consultations/common/interfaces/consultations-service.interface';
import { CreateConsultationDto } from '@modules/consultations/common/dto/create-consultation.dto';
import { Inject } from '@nestjs/common';
import ConsultationsConfig from '@modules/consultations/config/consultations-config.loader';
import { ConfigType } from '@nestjs/config';
import GeneralUsersService from '@modules/users/services/general-users';
import { GeneralUsersServiceInterface } from '@modules/users/common/interfaces/general-users-service.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConsultationEventEnum } from '@modules/consultations/events/consultation-event.enum';
import { AfterConsultationCreateEvent } from '@modules/consultations/events/after-consultation-create.event';
import { UserInterface } from '@modules/users/common/interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';

export class ConsultationsService
  extends TypeormService<ConsultationInterface, ConsultationRepository>(
    ConsultationEntity,
  )
  implements ConsultationsServiceInterface
{
  public constructor(
    @InjectRepository(ConsultationEntity)
    public readonly repository: ConsultationRepository,
    @Inject(ConsultationsConfig.KEY)
    private readonly consultationsConfig: ConfigType<
      typeof ConsultationsConfig
    >,
    @Inject(EventEmitter2)
    public readonly eventEmitter: EventEmitter2,
    @Inject(GeneralUsersService.TOKEN)
    private readonly generalUsersService: GeneralUsersServiceInterface,
  ) {
    super(repository);
  }

  public async createConsultations(
    user: UserInterface,
    data: CreateConsultationDto,
  ): Promise<ConsultationInterface> {
    const lawyer = await this.generalUsersService.lawyersService.findOne({
      where: {
        id: data.lawyerId,
      },
    });

    if (!lawyer) {
      throw new Error('Unknown lawyer');
    }

    const lastConsultation = await this.findOne({
      where: {
        lawyerId: lawyer.id,
      },
      order: {
        startAt: 'DESC',
      },
    });

    console.log(lastConsultation);

    if (
      lastConsultation &&
      (data.startAt - lastConsultation.startAt >
        this.consultationsConfig.minInterval ||
        Date.now() > data.startAt)
    ) {
      throw new Error('Interval');
    }

    const consultation = await this.createOne({
      userId: user.id,
      lawyerId: data.lawyerId,
      startAt: data.startAt,
    });

    await this.eventEmitter.emitAsync(
      ConsultationEventEnum.AFTER_CONSULTATION_CREATE,
      new AfterConsultationCreateEvent(user, lawyer, consultation),
    );

    return consultation;
  }
}
