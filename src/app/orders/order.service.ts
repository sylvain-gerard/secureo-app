import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IOrder } from './iorder';
import { IOrderItem } from './IOrderItem';
import { tap, catchError } from 'rxjs/operators';
import { CartItem } from '../cart/CartItem';

@Injectable()
export class OrderService {
  private url = environment.REST_API_URL + 'orders';
  id: number;
  update$: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) { }

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.url}`) as Observable<IOrder[]>;
  }

  getOrder(id): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.url}/${id}`) as Observable<IOrder>;
  }

  getOrderItems(id): Observable<IOrderItem[]> {
    return this.http.get<IOrderItem[]>(`${this.url}/${id}/items`) as Observable<IOrderItem[]>;
  }

  createOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(`${this.url}`, order).pipe(tap(data => this.update$.next()));
  }

  updateOrder(order: IOrder): Observable<IOrder> {
    return this.http.put<IOrder>(`${this.url}/${order.id}`, order).pipe(tap(data => this.update$.next()));
  }
  // to test
  createOrderItem(item: IOrderItem): Observable<IOrderItem> {
    return this.http.post<IOrderItem>(`${this.url}/${item.order.id}/items`, item).pipe(tap(data => this.update$.next()));
  }

}
