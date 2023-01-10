import { Factory } from 'nestjs-seeder';
import { LawBranchBitField } from '@common/utils/law-branch.bit-field';
import { LawBranchEnum } from '@common/enums/law-branch.enum';
import { randomEnum } from '@common/utils/random-enum.function';
import { Faker } from '@faker-js/faker';
import { USERS_TELEPHONES } from '@/seeders/initial.seeder';
import { UserPermissionsBitField } from '@modules/users/common/utils/user-permissions.bit-field';

export class LawyerSchema {
  @Factory((faker: Faker) => {
    let telephone = faker.phone.number();

    while (USERS_TELEPHONES.has(telephone)) {
      telephone = faker.phone.number();
    }

    USERS_TELEPHONES.add(telephone);

    return telephone;
  })
  public telephone!: string;

  @Factory((faker: Faker) => faker.internet.password())
  public password!: string;

  @Factory((faker: Faker) => faker.name.firstName())
  public firstName!: string;

  @Factory((faker: Faker) => faker.name.lastName())
  public lastName!: string;

  @Factory((faker: Faker) => faker.name.middleName())
  public patronymic!: string;

  @Factory(() => new UserPermissionsBitField())
  public permissions!: UserPermissionsBitField;

  @Factory(() => {
    const maxValuesCount = Math.floor(
      (Math.random() * Object.values(LawBranchEnum).length) / 2,
    );
    const enumValues: LawBranchEnum[] = [];

    for (let index = 0; index < maxValuesCount; index++) {
      enumValues.push(randomEnum(LawBranchEnum));
    }

    return new LawBranchBitField(enumValues);
  })
  public lawBranches!: LawBranchBitField;
}
