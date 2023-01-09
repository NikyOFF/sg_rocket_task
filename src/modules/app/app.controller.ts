import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller({ version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  @ApiResponse({ status: HttpStatus.OK })
  public ping(): object {
    return this.appService.ping();
  }
}
