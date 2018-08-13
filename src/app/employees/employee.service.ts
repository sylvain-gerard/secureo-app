import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IEmployees } from './iemployees';
import { IPosting } from '../posting/iposting';
import { IOrder } from '../orders/iorder';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class EmployeeService {
  private url = environment.REST_API_URL + 'employees';
  id: number;
  email: string;
  update$: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<IEmployees[]> {
    return this.http.get<IEmployees[]>(`${this.url}`);
  }

  getEmployee(id): Observable<IEmployees> {
    return this.http.get<IEmployees>(`${this.url}/${id}`);
  }

  createEmployee(employee: IEmployees): Observable<IEmployees> {
    return this.http.post<IEmployees>(`${this.url}`, employee).pipe(tap(data => this.update$.next()));
  }

  updateEmployee(employee: IEmployees): Observable<IEmployees> {
    return this.http
      .put<IEmployees>(`${this.url}/${employee.id}`, employee)
      .pipe(tap(data => this.update$.next()));
  }

  deleteEmployee(id) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getEmployeeByEmail(email): Observable<IEmployees> {
    return this.http.get<IEmployees>(`${this.url}/email/${email}/`);
  }

  getEmployeePosting(id): Observable<IPosting> {
    return this.http.get<IPosting>(`${this.url}/${id}/posting`);
  }

  getManagerOfEmployee(id): Observable<IEmployees> {
    return this.http.get<IEmployees>(`${this.url}/${id}/manager`);
  }

  getOrdersOfEmployee(id): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.url}/${id}/orders`);
  }
}
