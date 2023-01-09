import { Transform, TransformOptions } from 'class-transformer';

export const DefaultTransform = <T>(
  defaultValue: T,
  options: TransformOptions = { toClassOnly: true },
) => Transform((params) => params.value || defaultValue, options);
