import { registerServiceProvider } from '@packages/nest-service-provider/register-service-provider.util';
import { GeneralUsersServiceInterface } from '@modules/users/common/interfaces/general-users-service.interface';
import { GeneralUsersService } from '@modules/users/services/general-users/general-users.service';

export default registerServiceProvider<GeneralUsersServiceInterface>(
  'GENERAL_USERS_SERVICE',
  GeneralUsersService,
);
