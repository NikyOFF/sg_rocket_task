import { registerAs } from '@nestjs/config';
import { load } from 'js-yaml';
import { readFileSync } from 'node:fs';
import {
  ObjectMapper,
  PropertyNamingStrategyEnum,
} from '@packages/object-mapper';
import { SeederConfig } from '@/seeders/config/seeder.config';

export default registerAs(SeederConfig.name, () =>
  new ObjectMapper()
    .setPropertyNamingStrategy(PropertyNamingStrategyEnum.LOWER_CAMEL_CASE)
    .formatObject(
      load(
        readFileSync(`${process.cwd()}/configs/seeder-config.yml`, 'utf8'),
      ) as object,
      PropertyNamingStrategyEnum.SNAKE_CASE,
      SeederConfig,
    ),
);
