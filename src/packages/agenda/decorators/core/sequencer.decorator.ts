import { SetMetadata } from '@nestjs/common';
import { SEQUENCER_METADATA } from '@packages/agenda/constants';

export const Sequencer = (): ClassDecorator =>
  SetMetadata(SEQUENCER_METADATA, true);
