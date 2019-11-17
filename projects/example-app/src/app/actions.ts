import { createAction, props } from '@ngrx/store';

export const updateTitle = createAction('[app] Update title', props<{title: string}>());
