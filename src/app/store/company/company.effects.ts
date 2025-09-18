import { createEffect, ofType, Actions } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { loadCompany, loadCompanySuccess, loadCompanyFailure } from './company.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Company } from '../../models/company.model';

@Injectable()
export class CompanyEffects {

  private actions$ = inject(Actions);          // <- wstrzyknięcie przez inject()
  private companyService = inject(CompanyService);  // <- wstrzyknięcie serwisu

  loadCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCompany),
      mergeMap(() =>
        this.companyService.getCompany().pipe(
          map((company) => loadCompanySuccess({ company: company as Company })),
          catchError((error) => of(loadCompanyFailure({ error })))
        )
      )
    )
  );
}
