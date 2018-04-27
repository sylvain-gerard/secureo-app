import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './iuser';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  private url =  environment.REST_API_URL + 'users';

  update$: Subject<any> = new Subject<any>();
  selectedUser: User;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}`) as Observable<User[]>;
  }

}
