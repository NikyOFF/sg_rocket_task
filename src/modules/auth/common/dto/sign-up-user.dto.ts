import { Expose } from 'class-transformer';
import { IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsUserPassword } from '@modules/users/common/decorators/password.validator';

export class SignUpUserDto {
  @Expose()
  @ApiProperty()
  @IsPhoneNumber()
  public telephone: string;

  @Expose()
  @ApiProperty()
  @IsUserPassword()
  public password: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @MinLength(1)
  public fistName: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @MinLength(1)
  public lastName: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @MinLength(1)
  public patronymic: string;
}
