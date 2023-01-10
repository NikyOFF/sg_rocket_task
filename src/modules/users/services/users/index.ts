import { registerServiceProvider } from '@packages/nest-service-provider/register-service-provider.util';
import { UsersService } from '@modules/users/services/users/users.service';
import { UsersServiceInterface } from '@modules/users/common/interfaces/users-service.interface';

export default registerServiceProvider<UsersServiceInterface>(
  'USERS_SERVICE',
  UsersService,
);
