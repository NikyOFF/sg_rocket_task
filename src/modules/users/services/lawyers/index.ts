import { registerServiceProvider } from '@packages/nest-service-provider/register-service-provider.util';
import { LawyersServiceInterface } from '@modules/users/common/interfaces/lawyers-service.interface';
import { LawyersService } from '@modules/users/services/lawyers/lawyers.service';

export default registerServiceProvider<LawyersServiceInterface>(
  'LAWYERS_SERVICE',
  LawyersService,
);
