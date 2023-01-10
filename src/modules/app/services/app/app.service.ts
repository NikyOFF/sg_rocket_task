import { Injectable } from '@nestjs/common';
import { AppServiceInterface } from '@modules/app/common/interfaces/app-service.interface';

@Injectable()
export class AppService implements AppServiceInterface {
  public ping(): object {
    return { message: 'pong' };
  }
}
