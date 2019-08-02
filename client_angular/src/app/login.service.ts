import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root' })
export class LoginService {
  private customerUrl = 'http://localhost:5000/customer';
  constructor( private http: HttpClient ) { }

  addCustomer(customer): Observable<any> {
    return this.http.post('http://localhost:5000/customer', customer, httpOptions).pipe(
      tap((newCustomer) => this.log(`added customer w/ id=${newCustomer}`)),
      catchError(this.handleError('addCustomer'))
    );
  }

  private log(message: string) {}

 private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}

}
