import { ChangeDetectorRef, InjectionToken, Injectable, ComponentRef } from '@angular/core';
import { Store } from '@ngrx/store';

export const AUTOBINDER_TARGETS = new InjectionToken('AUTOBINDER_TARGETS');

@Injectable()
export class Autobinder {
  constructor(private readonly store: Store<any>) {}

  bind(componentRef: ComponentRef<any>): void {
    Object.getOwnPropertyNames(componentRef.instance)
      .filter((property) => componentRef.instance[property].hasOwnProperty('__ngrx-util/create-binding__'))
      .forEach((property) => componentRef.instance[property] = componentRef
        .instance[property]['__ngrx-util/create-binding__']
        .bind({store: this.store})
      );
  }
}
