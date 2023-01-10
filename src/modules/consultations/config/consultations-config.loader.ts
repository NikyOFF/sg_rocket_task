import { registerAs } from '@nestjs/config';
import {
  ObjectMapper,
  PropertyNamingStrategyEnum,
} from '@packages/object-mapper';
import { load } from 'js-yaml';
import { readFileSync } from 'node:fs';
import { ConsultationsConfig } from '@modules/consultations/config/consultations.config';

export default registerAs(ConsultationsConfig.name, () =>
  new ObjectMapper()
    .setPropertyNamingStrategy(PropertyNamingStrategyEnum.LOWER_CAMEL_CASE)
    .formatObject(
      load(
        readFileSync(
          `${process.cwd()}/configs/consultations-config.yml`,
          'utf8',
        ),
      ) as object,
      PropertyNamingStrategyEnum.SNAKE_CASE,
      ConsultationsConfig,
    ),
);
