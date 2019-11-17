import { createSelector, createFeatureSelector } from '@ngrx/store';

import { CoreState } from './state';

export const selectCore   = createFeatureSelector<CoreState>('core');
export const selectTitle  = createSelector(selectCore, ({title}) => title);
