import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { InvoiceSummaryComponent } from './invoice-summary.component';
import { MemoizedSelector } from '@ngrx/store';
import { Item } from '../../models/item.model';
import { Company } from '../../models/company.model';
import * as fromInvoice from '../../store/invoice/invoice.selectors';
import * as fromCompany from '../../store/company/company.selectors';
import { By } from '@angular/platform-browser';

describe('InvoiceSummaryComponent', () => {
  let component: InvoiceSummaryComponent;
  let fixture: ComponentFixture<InvoiceSummaryComponent>;
  let store: MockStore;
  let mockItemsSelector: MemoizedSelector<any, Item[]>;
  let mockTotalSelector: MemoizedSelector<any, number>;
  let mockCompanySelector: MemoizedSelector<any, Company | null>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceSummaryComponent],
      providers: [provideMockStore()]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    mockItemsSelector = store.overrideSelector(fromInvoice.selectInvoiceItems, []);
    mockTotalSelector = store.overrideSelector(fromInvoice.selectInvoiceTotal, 0);
    mockCompanySelector = store.overrideSelector(fromCompany.selectCompany, null);

    fixture = TestBed.createComponent(InvoiceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "No items" when items list is empty', () => {
    const el = fixture.debugElement.query(By.css('p'));
    expect(el.nativeElement.textContent).toContain('No items');
  });

  it('should display company info when available', () => {
    const mockCompany: Company = { name: 'Test Co', address: '123 Street', phones: ['111', '222'] };
    mockCompanySelector.setResult(mockCompany);
    store.refreshState();
    fixture.detectChanges();

    const companyName = fixture.debugElement.query(By.css('.company-info h2')).nativeElement;
    expect(companyName.textContent).toBe('Test Co');

    const phones = fixture.debugElement.query(By.css('.company-info p:nth-child(3)')).nativeElement;
    expect(phones.textContent).toContain('111, 222');
  });
});
