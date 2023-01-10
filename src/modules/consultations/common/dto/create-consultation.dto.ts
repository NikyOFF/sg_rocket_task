import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConsultationDto {
  @Expose()
  @ApiProperty()
  public lawyerId: string;

  @Expose()
  @ApiProperty()
  public startAt: number;
}
