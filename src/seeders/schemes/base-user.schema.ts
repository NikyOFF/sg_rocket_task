import { Factory } from 'nestjs-seeder';
import { Faker } from '@faker-js/faker';
import { UserPermissionsBitField } from '@modules/users/common/utils/user-permissions.bit-field';
import { USERS_TELEPHONES } from '@/seeders/initial.seeder';

export class BaseUserSchema {
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
}
