import { createParamDecorator } from '@packages/agenda/utils/create-param-decorator.util';
import { AgendaParamtypeEnum } from '@packages/agenda/enums/agenda-paramtype.enum';

export const JobContext: () => ParameterDecorator = createParamDecorator(
  AgendaParamtypeEnum.JOB,
);
