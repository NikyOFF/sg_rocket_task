import { Provider } from '@nestjs/common';

export interface ServiceProvider<T = any> {
  TOKEN: symbol;
  PROVIDER: Provider<T>;
}
