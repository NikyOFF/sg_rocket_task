import { DefineOptions } from 'agenda/dist/agenda/define';
import { JobSequenceMetadataInterface } from '@packages/agenda/interfaces/job-sequence-metadata.interface';
import { JOB_SEQUENCE_METADATA } from '@packages/agenda/constants';

export const JobSequence =
  (name: string, options?: DefineOptions): MethodDecorator =>
  (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const metadata: JobSequenceMetadataInterface[] = [
      {
        name: name,
        options: options,
      },
    ];

    const previousValue =
      Reflect.getMetadata(JOB_SEQUENCE_METADATA, descriptor.value) || [];

    const value = [...previousValue, ...metadata];

    Reflect.defineMetadata(JOB_SEQUENCE_METADATA, value, descriptor.value);

    return descriptor;
  };
