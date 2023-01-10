import { Expose } from 'class-transformer';
import {
  IsNumber,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsUserPassword } from '@modules/users/common/decorators/password.validator';
import { LawBranchEnum } from '@common/enums/law-branch.enum';

export class SignUpLawyerDto {
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

  @Expose()
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(LawBranchEnum.ALL)
  public lawBranches: number;
}
