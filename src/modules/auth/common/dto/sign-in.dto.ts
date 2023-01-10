import { Expose } from 'class-transformer';
import { IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @Expose()
  @ApiProperty()
  @IsPhoneNumber()
  public telephone: string;

  @Expose()
  @ApiProperty()
  @IsString()
  public password: string;
}
