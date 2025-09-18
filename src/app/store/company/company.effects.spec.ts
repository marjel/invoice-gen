import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { CompanyEffects } from './company.effects';
import { CompanyService } from '../../services/company.service';
import { loadCompany, loadCompanySuccess, loadCompanyFailure } from './company.actions';
import { Company } from '../../models/company.model';
import { hot, cold } from 'jasmine-marbles';
import { Action } from '@ngrx/store';

describe('CompanyEffects', () => {
  let actions$: Observable<Action>;
  let effects: CompanyEffects;
  let companyService: jasmine.SpyObj<CompanyService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CompanyService', ['getCompany']);

    TestBed.configureTestingModule({
      providers: [
        CompanyEffects,
        provideMockActions(() => actions$),
        { provide: CompanyService, useValue: spy }
      ]
    });

    effects = TestBed.inject(CompanyEffects);
    companyService = TestBed.inject(CompanyService) as jasmine.SpyObj<CompanyService>;
  });

  it('should dispatch loadCompanySuccess on successful company load', () => {
    const company: Company = {
      name: 'Demo Company',
      address: '123 Demo Street',
      phones: ['111-222-333', '444-555-666']
    };

    const action = loadCompany();
    const outcome = loadCompanySuccess({ company });

    actions$ = hot('-a', { a: action });
    const response$ = cold('-b|', { b: company });
    companyService.getCompany.and.returnValue(response$);

    const expected$ = cold('--c', { c: outcome });

    expect(effects.loadCompany$).toBeObservable(expected$);
  });

  it('should dispatch loadCompanyFailure on company load error', () => {
    const error = new Error('Failed to load');
    const action = loadCompany();
    const outcome = loadCompanyFailure({ error });

    actions$ = hot('-a', { a: action });
    const response$ = cold('-#|', {}, error);
    companyService.getCompany.and.returnValue(response$);

    const expected$ = cold('--c', { c: outcome });

    expect(effects.loadCompany$).toBeObservable(expected$);
  });
});
