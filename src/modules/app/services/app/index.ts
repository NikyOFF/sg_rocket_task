import { registerServiceProvider } from '@packages/nest-service-provider/register-service-provider.util';
import { AppService } from '@modules/app/services/app/app.service';

export default registerServiceProvider<AppService>('APP_SERVICE', AppService);
