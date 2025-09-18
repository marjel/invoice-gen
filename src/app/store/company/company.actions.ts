import { createAction, props } from '@ngrx/store';
import { Company } from '../../models/company.model';

export const loadCompany = createAction('[Company] Load Company');

export const loadCompanySuccess = createAction(
  '[Company] Load Company Success',
  props<{ company: Company }>()
);

export const loadCompanyFailure = createAction(
  '[Company] Load Company Failure',
  props<{ error: any }>()
);
export {};