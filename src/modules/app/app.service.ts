import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public ping(): object {
    return { message: 'pong' };
  }
}
