import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompanyState } from './company.reducer';

export const selectCompanyState = createFeatureSelector<CompanyState>('company');

export const selectCompany = createSelector(
  selectCompanyState,
  (state) => state.company
);

export const selectCompanyLoading = createSelector(
  selectCompanyState,
  (state) => state.loading
);

export const selectCompanyError = createSelector(
  selectCompanyState,
  (state) => state.error
);
export {};