import { registerServiceProvider } from '@packages/nest-service-provider/register-service-provider.util';
import { BaseUsersServiceInterface } from '@modules/users/common/interfaces/base-users-service.interface';
import { BaseUsersService } from './base-users.service';

export default registerServiceProvider<BaseUsersServiceInterface>(
  'BASE_USERS_SERVICE',
  BaseUsersService,
);
