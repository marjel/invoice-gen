import { createReducer, on } from '@ngrx/store';
import { loadCompany, loadCompanySuccess, loadCompanyFailure } from './company.actions';
import { Company } from '../../models/company.model';

export interface CompanyState {
  company: Company | null;
  loading: boolean;
  error: any;
}

export const initialState: CompanyState = {
  company: null,
  loading: false,
  error: null
};

export const companyReducer = createReducer(
  initialState,
  on(loadCompany, (state) => ({ ...state, loading: true, error: null })),
  on(loadCompanySuccess, (state, { company }) => ({ ...state, loading: false, company })),
  on(loadCompanyFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
