import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject ,  Observable } from 'rxjs';
import { IPosting } from './iposting';
import { IEmployees } from '../employees/iemployees';

@Injectable()
export class PostingService {
  private url = environment.REST_API_URL + 'postings';
  id: number;
  update$: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) { }

  getPostings(): Observable<IPosting[]> {
    return this.http.get<IPosting[]>(`${this.url}`) as Observable<IPosting[]>;
  }

  getPosting(id): Observable<IPosting> {
    return this.http.get<IPosting>(`${this.url}/${id}`) as Observable<IPosting>;
  }

  getEmployeesOfPosting(id): Observable<IEmployees[]> {
    return this.http.get<IEmployees[]>(`${this.url}/${id}/employees`) as Observable<IEmployees[]>;
  }

  getManagersOfPosting(id): Observable<IEmployees[]> {
    return this.http.get<IEmployees[]>(`${this.url}/${id}/managers`) as Observable<IEmployees[]>;
  }

}
