import { registerServiceProvider } from '@packages/nest-service-provider/register-service-provider.util';
import { ConsultationsService } from '@modules/consultations/services/consultations/consultations.service';
import { ConsultationsServiceInterface } from '@modules/consultations/common/interfaces/consultations-service.interface';

export default registerServiceProvider<ConsultationsServiceInterface>(
  'CONSULTATIONS_SERVICE',
  ConsultationsService,
);
