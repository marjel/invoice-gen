import { createReducer, on } from '@ngrx/store';
import { addItems, clearItems } from './invoice.actions';
import { Item } from '../../models/item.model';

export interface InvoiceState {
  items: Item[];
}

export const initialState: InvoiceState = {
  items: []
};

export const invoiceReducer = createReducer(
  initialState,
  on(addItems, (state, { items }) => ({ ...state, items })),
  on(clearItems, (state) => ({ ...state, items: [] }))
);
export {};