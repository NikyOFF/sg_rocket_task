import { Inject } from '@nestjs/common';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { UserEntity } from '../../users/user/user.entity';
import { BCRYPT_SERVICE_TOKEN } from '@packages/bcrypt/bcrypt-service.provider';
import { BcryptServiceInterface } from '@packages/bcrypt/bcrypt-service.interface';
import { BaseUserEntity } from '@modules/users/base-user/base-user.entity';

@EventSubscriber()
export class BcryptUserSubscriber
  implements EntitySubscriberInterface<BaseUserEntity>
{
  constructor(
    public readonly dataSource: DataSource,
    @Inject(BCRYPT_SERVICE_TOKEN)
    public readonly bcryptService: BcryptServiceInterface,
  ) {
    dataSource.subscribers.push(this);
  }

  public listenTo() {
    return BaseUserEntity;
  }

  public async beforeInsert(event: InsertEvent<BaseUserEntity>): Promise<void> {
    event.entity.password = await this.bcryptService.hash(
      event.entity.password,
    );
  }

  public async beforeUpdate(event: UpdateEvent<BaseUserEntity>): Promise<void> {
    if (!event.entity) {
      return;
    }

    if (
      event.updatedColumns.findIndex(
        (column) => column.propertyName === 'password',
      ) === -1
    ) {
      return;
    }

    event.entity.password = await this.bcryptService.hash(
      event.entity.password,
    );
  }
}
