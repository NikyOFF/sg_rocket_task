import { Inject } from '@nestjs/common';
import { AGENDA } from '@packages/agenda/constants';

export const InjectAgenda = () => Inject(AGENDA);
