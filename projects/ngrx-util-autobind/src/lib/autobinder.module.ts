import { NgModule, ModuleWithProviders, Type, Inject, InjectionToken, ComponentFactoryResolver, APP_INITIALIZER } from '@angular/core';
import { AUTOBINDER_TARGETS, Autobinder } from './autobinder';

export const COMPONENT_FACTORIES = new InjectionToken('COMPONENT_FACTORIES');

@NgModule({})
export class AutobinderModule {
  constructor(@Inject(COMPONENT_FACTORIES) factories, autobinder: Autobinder) {
    factories.forEach(factory => {
      const create = factory.create.bind(factory);

      Object.defineProperty(factory.__proto__, 'create', {
        value: (...args) => {
          const componentRef = create(...args);
          autobinder.bind(componentRef);
          return componentRef;
        }
      });
    });
  }

  public static forRoot(components: Type<any>[]) {
    return { ngModule: AutobinderModule, providers: [...AutobinderModule.forComponents(components).providers, Autobinder] };
  }

  public static forComponents(components: Type<any>[]): ModuleWithProviders {
    return {
      ngModule: AutobinderModule,
      providers: [
        { provide: AUTOBINDER_TARGETS, useValue: components },
        { provide: COMPONENT_FACTORIES,
          useFactory: AutobinderModule.resolveFactories,
          deps: [AUTOBINDER_TARGETS, ComponentFactoryResolver] },
        { provide: APP_INITIALIZER, useFactory: AutobinderModule.ok, deps: [COMPONENT_FACTORIES], multi: true }
      ],
    };
  }

  private static ok(factories) {
    return async () => true;
  }

  private static resolveFactories(types, resolver: ComponentFactoryResolver) {
    return types.map((type) => resolver.resolveComponentFactory(type));
  }
}
