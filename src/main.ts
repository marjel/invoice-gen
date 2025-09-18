import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { AppComponent } from './app/app.component';
import { ItemsFormComponent } from './app/components/items-form/items-form.component';
import { InvoiceSummaryComponent } from './app/components/invoice-summary/invoice-summary.component';
import { invoiceReducer } from './app/store/invoice/invoice.reducer';
import { companyReducer } from './app/store/company/company.reducer';
import { CompanyEffects } from './app/store/company/company.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: ItemsFormComponent },
      { path: 'invoice-summary', component: InvoiceSummaryComponent }
    ]),
    provideStore({ invoice: invoiceReducer, company: companyReducer }),
    provideEffects([CompanyEffects]),
    provideStoreDevtools({ maxAge: 25 })
  ]
}).catch(err => console.error(err));
