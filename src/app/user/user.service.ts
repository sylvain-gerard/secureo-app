import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IUser } from './iuser';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { LogginUser } from './LogginUser';

@Injectable()
export class UserService {
  private url = environment.REST_API_URL + 'users';

  update$: Subject<any> = new Subject<any>();
  // selectedUser: IUser;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http
      .get<IUser[]>(`${this.url}`) as Observable<IUser[]>;
  }

  getUser(id): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/${id}`) as Observable<IUser>;
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http
      .put<IUser>(`${this.url}/${user.id}`, user)
      .pipe(tap(data => this.update$.next()));
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http
      .post<IUser>(`${this.url}`, user)
      .pipe(tap(data => this.update$.next()));
  }

  deleteUser(id) {
    return this.http.delete(`${this.url}/${id}`).pipe(tap(data => this.update$.next()));
  }

  postUserInfos(loggedUser: LogginUser) {
    console.log('IN SERVICE');
    console.log(loggedUser);
    return this.http.post<LogginUser>(`${this.url}/loggin`, loggedUser);
  }
}
