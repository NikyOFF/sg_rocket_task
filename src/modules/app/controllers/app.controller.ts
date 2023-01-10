import { Controller, Get, HttpStatus, Inject } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import AppService from '@modules/app/services/app';
import { AppServiceInterface } from '@modules/app/common/interfaces/app-service.interface';

@Controller({ version: '1' })
export class AppController {
  constructor(
    @Inject(AppService.TOKEN)
    private readonly appService: AppServiceInterface,
  ) {}

  @Get('/ping')
  @ApiResponse({ status: HttpStatus.OK })
  public ping(): object {
    return this.appService.ping();
  }
}
