import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsJWT, IsNumber, IsString } from 'class-validator';

export class AccessTokenDto {
  @ApiProperty()
  @Expose()
  @IsJWT()
  public accessToken: string;

  @ApiProperty()
  @Expose()
  @IsString()
  public tokenType: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  public expiresIn: number;
}
