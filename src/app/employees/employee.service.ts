import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { IEmployees } from './iemployees';

@Injectable()
export class EmployeeService {
  private url = environment.REST_API_URL + 'employees';

  update$: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<IEmployees[]> {
    return this.http.get<IEmployees[]>(`${this.url}`) as Observable<IEmployees[]>;
  }

  createEmployee(id): Observable<IEmployees> {
    return this.http.get<IEmployees>(`${this.url}/${id}`) as Observable<IEmployees>;
  }
}
