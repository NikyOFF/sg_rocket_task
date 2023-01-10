import { Injectable, OnModuleInit } from '@nestjs/common';
import { AgendaParamsFactory } from '@packages/agenda/factories/agenda-params.factory';
import Agenda from 'agenda';
import { MetadataAccessorService } from '@packages/agenda/services/metadata-accessor.service';
import {
  DiscoveryService,
  MetadataScanner,
  ModuleRef,
  ModulesContainer,
} from '@nestjs/core';
import { ExternalContextCreator } from '@nestjs/core/helpers/external-context-creator';
import { AGENDA, PARAM_ARGS_METADATA } from '@packages/agenda/constants';
import { Module } from '@nestjs/core/injector/module';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { ParamMetadata } from '@nestjs/core/helpers/interfaces';
import { AgendaContextType } from '@packages/agenda/types/agenda-context.type';
import { flattenDeep, identity } from 'lodash';

@Injectable()
export class ExplorerService implements OnModuleInit {
  private readonly agendaParamsFactory = new AgendaParamsFactory();
  private agenda: Agenda;

  public constructor(
    private readonly metadataAccessor: MetadataAccessorService,
    private readonly moduleRef: ModuleRef,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly modulesContainer: ModulesContainer,
    private readonly externalContextCreator: ExternalContextCreator,
  ) {}

  public onModuleInit(): any {
    this.agenda = this.moduleRef.get<Agenda>(AGENDA);

    this.explore();
  }

  private explore(): void {
    const modules = [...this.modulesContainer.values()];

    this.registerSequencers(modules);
  }

  private registerSequencers(modules: Module[]): void {
    const sequencerWrappers = this.flatMap<InstanceWrapper>(
      modules,
      (wrapper) => this.filterSequencers(wrapper),
    );

    sequencerWrappers.forEach((wrapper) => this.registerJobSequencers(wrapper));
  }

  private registerJobSequencers(wrapper: InstanceWrapper<unknown>): void {
    const instancePrototype = Object.getPrototypeOf(wrapper.instance);

    this.metadataScanner.scanFromPrototype(
      wrapper.instance,
      instancePrototype,
      (name) => {
        this.registerJobSequencer(wrapper.instance, instancePrototype, name);
      },
    );
  }

  private registerJobSequencer(
    instance: any,
    prototype: any,
    methodName: string,
  ): void {
    const methodRef = prototype[methodName];
    const sequencerJobMetadata =
      this.metadataAccessor.getJobSequenceMetadata(methodRef);

    if (!sequencerJobMetadata) {
      return;
    }

    for (const jobMetadata of sequencerJobMetadata) {
      const processorFunction = this.createContextProcessor(
        instance,
        prototype,
        methodName,
      );

      this.agenda.define(
        jobMetadata.name,
        jobMetadata.options || {},
        async (job, done) => {
          await processorFunction(job, done);
        },
      );
    }
  }

  private createContextProcessor<T extends Record<string, unknown>>(
    instance: T,
    prototype: unknown,
    methodName: string,
  ) {
    return this.externalContextCreator.create<
      Record<number, ParamMetadata>,
      AgendaContextType
    >(
      instance,
      prototype[methodName],
      methodName,
      PARAM_ARGS_METADATA,
      this.agendaParamsFactory,
      undefined,
      undefined,
      undefined,
      'agenda',
    );
  }

  private filterSequencers(wrapper: InstanceWrapper): InstanceWrapper<unknown> {
    if (!wrapper.instance) {
      return undefined;
    }

    const isSequence = this.metadataAccessor.isSequencer(wrapper.metatype);

    if (!isSequence) {
      return undefined;
    }

    return wrapper;
  }

  private includeWhitelisted(
    modulesContainer: Map<string, Module>,
    include: Function[],
  ): Module[] {
    const modules = [...modulesContainer.values()];
    return modules.filter(({ metatype }) => include.includes(metatype));
  }

  private flatMap<T>(
    modules: Module[],
    callback: (instance: InstanceWrapper, moduleRef: Module) => T | T[],
  ): T[] {
    const visitedModules = new Set<Module>();

    const unwrap = (moduleRef: Module) => {
      if (visitedModules.has(moduleRef)) {
        return [];
      } else {
        visitedModules.add(moduleRef);
      }

      const providers = [...moduleRef.providers.values()];
      const defined = providers.map((wrapper) => callback(wrapper, moduleRef));

      const imported: (T | T[])[] = moduleRef.imports?.size
        ? [...moduleRef.imports.values()].reduce((prev, cur) => {
            return [...prev, ...unwrap(cur)];
          }, [])
        : [];

      return [...defined, ...imported];
    };

    return flattenDeep(modules.map(unwrap)).filter(identity);
  }
}
