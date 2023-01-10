import { Sequencer } from '@packages/agenda/decorators/core/sequencer.decorator';
import { JobContext } from '@packages/agenda/decorators/params/job-context.decorator';
import { JobSequence } from '@packages/agenda/decorators/core/job-sequence.decorator';
import { Job, JobAttributesData } from 'agenda';

export const CONSOLE_NOTIFICATION_JOB = 'CONSOLE_NOTIFICATION_JOB';

export interface ConsoleNotificationJobData extends JobAttributesData {
  message: string;
}

@Sequencer()
export class ConsoleNotificationSequencer {
  @JobSequence(CONSOLE_NOTIFICATION_JOB)
  public async notifyJob(
    @JobContext() job: Job<ConsoleNotificationJobData>,
  ): Promise<void> {
    console.log(job.attrs.data.message);

    await job.remove();
  }
}
