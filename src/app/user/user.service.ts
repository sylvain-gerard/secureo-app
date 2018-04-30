import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IUser } from './iuser';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  private url =  environment.REST_API_URL + 'users';

  update$: Subject<any> = new Subject<any>();
  selectedUser: IUser;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.url}`) as Observable<IUser[]>;
  }

}
