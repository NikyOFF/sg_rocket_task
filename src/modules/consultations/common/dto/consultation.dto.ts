import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ConsultationDto {
  @Expose()
  @ApiProperty()
  public id: string;

  @Expose()
  @ApiProperty()
  public lawyerId: string;

  @Expose()
  @ApiProperty()
  public userId: string;

  @Expose()
  @ApiProperty()
  public startAt: number;
}
