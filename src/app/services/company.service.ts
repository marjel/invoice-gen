import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

    private http: HttpClient = inject(HttpClient);
    private url = 'assets/company.json';
  
    getCompany(): Observable<Company> {
        return this.http.get<Company>(this.url);
    }
}