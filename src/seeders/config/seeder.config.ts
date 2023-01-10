import { Expose } from 'class-transformer';

export class SeederConfig {
  @Expose()
  public minUsersCount: number;

  @Expose()
  public maxUsersCount: number;

  @Expose()
  public minLawyersCount: number;

  @Expose()
  public maxLawyersCount: number;

  @Expose()
  public minConsultationsCount: number;

  @Expose()
  public maxConsultationsCount: number;
}
