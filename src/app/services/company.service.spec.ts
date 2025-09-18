import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CompanyService } from './company.service';
import { Company } from '../models/company.model';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService]
    });

    service = TestBed.inject(CompanyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch company data from JSON', () => {
    const mockCompany: Company = {
      name: 'Demo Company',
      address: '123 Demo Street',
      phones: ['111-222-333', '444-555-666']
    };

    service.getCompany().subscribe((company) => {
      expect(company).toEqual(mockCompany);
    });

    const req = httpMock.expectOne('assets/company.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockCompany);
  });
});
