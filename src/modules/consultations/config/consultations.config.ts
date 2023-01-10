import { Expose } from 'class-transformer';
import { MsTransform } from '@common/transformers/ms.transform';

export class ConsultationsConfig {
  @Expose()
  @MsTransform()
  public minInterval: number;
}
