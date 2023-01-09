import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository as RepositoryInterface,
} from 'typeorm';
import { Injectable, Type } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { TypeormServiceInterface } from './service.interface';
import { InjectRepository } from '@nestjs/typeorm';

export function TypeormService<
  Entity extends ObjectLiteral,
  Repository extends RepositoryInterface<Entity>,
>(classRef: Type<Entity>): Type<TypeormServiceInterface<Entity, Repository>> {
  @Injectable()
  class TypeormServiceClass
    implements TypeormServiceInterface<Entity, Repository>
  {
    constructor(
      @InjectRepository(classRef)
      public readonly repository: Repository,
    ) {}

    public get count(): Repository['count'] {
      return this.repository.count.bind(this.repository);
    }

    public get find(): Repository['find'] {
      return this.repository.find.bind(this.repository);
    }

    public get findOne(): Repository['findOne'] {
      return this.repository.findOne.bind(this.repository);
    }

    public get update(): Repository['update'] {
      return this.repository.update.bind(this.repository);
    }

    public get delete(): Repository['delete'] {
      return this.repository.delete.bind(this.repository);
    }

    public async createOne(dto: DeepPartial<Entity>): Promise<Entity> {
      return await this.repository.save(this.repository.create(dto));
    }

    public async updateOne(
      criteria: FindOptionsWhere<Entity>,
      dto: QueryDeepPartialEntity<Entity>,
    ): Promise<Entity | null> {
      await this.repository.update(criteria, dto);

      return this.findOne({
        where: criteria,
      });
    }
  }

  return TypeormServiceClass;
}
