import { registerServiceProvider } from '@packages/nest-service-provider/register-service-provider.util';
import { AuthServiceInterface } from '@modules/auth/common/interfaces/auth-service.interface';
import { AuthService } from '@modules/auth/services/auth/auth.service';

export default registerServiceProvider<AuthServiceInterface>(
  'AUTH_SERVICE',
  AuthService,
);
