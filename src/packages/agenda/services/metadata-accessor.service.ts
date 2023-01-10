import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JobSequenceMetadataInterface } from '@packages/agenda/interfaces/job-sequence-metadata.interface';
import {
  JOB_SEQUENCE_METADATA,
  SEQUENCER_METADATA,
} from '@packages/agenda/constants';

@Injectable()
export class MetadataAccessorService {
  public constructor(private readonly reflector: Reflector) {}

  public isSequencer(target: Function): boolean {
    if (!target) {
      return false;
    }

    return !!this.reflector.get(SEQUENCER_METADATA, target);
  }

  public isJobSequence(target: Function): boolean {
    if (!target) {
      return false;
    }

    return !!this.reflector.get(JOB_SEQUENCE_METADATA, target);
  }

  public getJobSequenceMetadata(
    target: Function,
  ): JobSequenceMetadataInterface[] | undefined {
    return this.reflector.get(JOB_SEQUENCE_METADATA, target);
  }
}
