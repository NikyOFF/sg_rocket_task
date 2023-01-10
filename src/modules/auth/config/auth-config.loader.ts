import { registerAs } from '@nestjs/config';
import {
  ObjectMapper,
  PropertyNamingStrategyEnum,
} from '@packages/object-mapper';
import { load } from 'js-yaml';
import { readFileSync } from 'node:fs';
import { AuthConfig } from './auth.config';

export default registerAs(AuthConfig.name, () =>
  new ObjectMapper()
    .setPropertyNamingStrategy(PropertyNamingStrategyEnum.LOWER_CAMEL_CASE)
    .formatObject(
      load(
        readFileSync(`${process.cwd()}/configs/auth-config.yml`, 'utf8'),
      ) as object,
      PropertyNamingStrategyEnum.SNAKE_CASE,
      AuthConfig,
    ),
);
