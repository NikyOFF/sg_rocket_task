import { Sequencer } from '@packages/agenda/decorators/core/sequencer.decorator';
import { JobContext } from '@packages/agenda/decorators/params/job-context.decorator';
import { JobSequence } from '@packages/agenda/decorators/core/job-sequence.decorator';
import { Job, JobAttributesData } from 'agenda';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Inject } from '@nestjs/common';

export const CONSOLE_NOTIFICATION_JOB = 'CONSOLE_NOTIFICATION_JOB';

export interface ConsoleNotificationJobData extends JobAttributesData {
  message: string;
}

@Sequencer()
export class ConsoleNotificationSequencer {
  public constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @JobSequence(CONSOLE_NOTIFICATION_JOB)
  public async notifyJob(
    @JobContext() job: Job<ConsoleNotificationJobData>,
  ): Promise<void> {
    this.logger.info(job.attrs.data.message);

    await job.remove();
  }
}
