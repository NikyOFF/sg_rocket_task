import { Transform } from 'class-transformer';
import ms from 'ms';

export const MsTransform = () =>
  Transform((params) =>
    ms(
      typeof params.value === 'string' ? params.value : params.value.toString(),
    ),
  );
