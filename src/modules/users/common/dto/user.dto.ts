import { Expose, Transform } from 'class-transformer';
import { UserPermissionsBitField } from '@modules/users/common/utils/user-permissions.bit-field';
import { LawBranchBitField } from '@common/utils/law-branch.bit-field';
import { IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @Expose()
  @ApiProperty()
  public id: string;

  @Expose()
  @ApiProperty()
  public telephone: string;

  @Expose()
  @ApiProperty()
  public firstName: string;

  @Expose()
  @ApiProperty()
  public lastName: string;

  @Expose()
  @ApiProperty()
  public patronymic: string;

  @Expose()
  @ApiProperty()
  @Transform(
    (params) => UserPermissionsBitField.resolve(params.value).toString(),
    { toPlainOnly: true },
  )
  public permissions: string;

  @Expose()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(
    (params) =>
      params.value ? LawBranchBitField.resolve(params.value).toString() : null,
    {
      toPlainOnly: true,
    },
  )
  public lawBranches?: string;
}
