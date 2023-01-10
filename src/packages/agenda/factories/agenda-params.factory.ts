import { ParamsFactory } from '@nestjs/core/helpers/external-context-creator';
import { AgendaParamtypeEnum } from '@packages/agenda/enums/agenda-paramtype.enum';
import { ParamData } from '@nestjs/common';
import { Job } from 'agenda';

export class AgendaParamsFactory implements ParamsFactory {
  public exchangeKeyForValue(
    type: AgendaParamtypeEnum,
    data: ParamData,
    args: any,
  ): any {
    const job = args[0] as Job;
    const done = args[1] as Function;

    switch (type) {
      case AgendaParamtypeEnum.JOB:
        return job;
      case AgendaParamtypeEnum.DONE:
        return done;
      default:
        return null;
    }
  }
}
