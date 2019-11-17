import { ActionCreator, Action, Store, MemoizedSelector } from '@ngrx/store';
import { Observable } from 'rxjs';

export declare type FunctionWithParametersType<P extends unknown[], R = void> = (...args: P) => R;
export declare type ParametersType<T> = T extends (...args: infer U) => unknown ? U : never;

export function createDispatcher<Type extends string, ActionFactory extends FunctionWithParametersType<any[], object>>(
    actionCreator: ActionCreator<Type, ActionFactory>
  ): (...args: ParametersType<ActionFactory>) => void {
  if (typeof actionCreator === 'function' && actionCreator.type !== undefined) {
    const value = function(this: { store: Store<any> }, ...properties: ParametersType<ActionFactory>) {
      if (!this.store) {
        return console.warn('Attempted to dispatch a action durin constructor initialization!');
      }

      this.store.dispatch(actionCreator(...properties) as Action);
    };

    Object.defineProperty(value, '__ngrx-util/create-binding__', { value });

    return value;
  }

  return null;
}

// export function createBinding<R>(memoizedSelector: MemoizedSelector<any, R, any>): R & { asObservable(): Observable<R>} {
//   if (typeof memoizedSelector === 'function' && memoizedSelector.projector !== undefined) {
//     const value = function(this: { store: Store<any> }, ...properties: ParametersType<ActionFactory>) {
//       if (!this.store) {
//         return console.warn('Attempted to dispatch a action durin constructor initialization!');
//       }

//       this.store.dispatch(actionCreator(...properties) as Action);
//     };

//     Object.defineProperty(value, '__ngrx-util/create-binding__', { value });

//     return value;
//   }

//   return null;
// }
