import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository as RepositoryInterface,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface TypeormServiceInterface<
  Entity extends ObjectLiteral,
  Repository extends RepositoryInterface<Entity>,
> {
  repository: Repository;

  findOne: Repository['findOne'];
  find: Repository['find'];
  count: Repository['count'];
  update: Repository['update'];
  delete: Repository['delete'];
  createOne: (dto: DeepPartial<Entity>) => Promise<Entity>;
  updateOne: (
    criteria: FindOptionsWhere<Entity>,
    dto: QueryDeepPartialEntity<Entity>,
  ) => Promise<Entity | null>;
}
