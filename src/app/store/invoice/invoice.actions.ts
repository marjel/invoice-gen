import { createAction, props } from '@ngrx/store';
import { Item } from '../../models/item.model';

export const addItems = createAction(
  '[Invoice] Add Items',
  props<{ items: Item[] }>()
);

export const clearItems = createAction('[Invoice] Clear Items');
export {};