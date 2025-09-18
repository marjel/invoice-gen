import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoiceState } from './invoice.reducer';

export const selectInvoiceState = createFeatureSelector<InvoiceState>('invoice');

export const selectInvoiceItems = createSelector(
  selectInvoiceState,
  (state) => state.items
);

export const selectInvoiceTotal = createSelector(
  selectInvoiceState,
  (state) =>
    state.items.reduce((total, item) => total + item.count * item.price, 0)
);
export {};