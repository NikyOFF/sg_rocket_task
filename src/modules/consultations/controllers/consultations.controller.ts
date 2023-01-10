import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import ConsultationsService from '@modules/consultations/services/consultations';
import { ConsultationsServiceInterface } from '@modules/consultations/common/interfaces/consultations-service.interface';
import { ConsultationDto } from '@modules/consultations/common/dto/consultation.dto';
import { CreateConsultationDto } from '@modules/consultations/common/dto/create-consultation.dto';
import { AuthStrategyTypeEnum } from '@modules/auth/common/enums/auth-strategy-type.enum';
import { UserJwtAuthGuard } from '@modules/auth/guards/user-jwt-auth.guard';
import { CurrentUser } from '@modules/auth/common/decorators/current-user.decorator';
import { UserInterface } from '@modules/users/common/interfaces/user.interface';

@Controller({
  path: 'consultations',
  version: '1',
})
@ApiTags('consultations')
export class ConsultationsController {
  public constructor(
    @Inject(ConsultationsService.TOKEN)
    private readonly consultationsService: ConsultationsServiceInterface,
  ) {}

  @Post()
  @SerializeOptions({
    type: ConsultationDto,
  })
  @UseGuards(UserJwtAuthGuard)
  @ApiBearerAuth(AuthStrategyTypeEnum.BASE_USER_JWT)
  @ApiBody({ type: CreateConsultationDto })
  @ApiResponse({ type: ConsultationDto, status: HttpStatus.OK })
  public async create(
    @CurrentUser() user: UserInterface,
    @Body() body: CreateConsultationDto,
  ): Promise<ConsultationDto> {
    return this.consultationsService.createConsultations(user, body);
  }
}
