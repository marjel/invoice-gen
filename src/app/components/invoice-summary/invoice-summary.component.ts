import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Company } from '../../models/company.model';
import { Item } from '../../models/item.model';
import { CommonModule } from '@angular/common';
import { selectCompany } from '../../store/company/company.selectors';
import { loadCompany } from '../../store/company/company.actions';
import { selectInvoiceItems, selectInvoiceTotal } from '../../store/invoice/invoice.selectors';
import { PhonesPipe } from '../../pipes/phones.pipe';

@Component({
  selector: 'app-invoice-summary',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.scss'],
  imports: [CommonModule, PhonesPipe],
})
export class InvoiceSummaryComponent implements OnInit {
  
  items$: Observable<Item[]>;
  total$: Observable<number>;
  company$: Observable<Company | null>;

  constructor(private store: Store) {
    this.items$ = this.store.select(selectInvoiceItems);
    this.total$ = this.store.select(selectInvoiceTotal);
    this.company$ = this.store.select(selectCompany);
  }

  ngOnInit(): void {
    this.store.dispatch(loadCompany());
  }
}
