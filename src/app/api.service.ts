import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from './product';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://alpine-bond-229708.appspot.com";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProducts (): Observable<Product[]> {
    const urlproducts=`${apiUrl}/select.php`;
    return this.http.get<Product[]>(urlproducts)
      .pipe(
        tap(products => console.log('Fetch products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${apiUrl}/selectone.php?id=${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  askQuery (product): Observable<Product[]> {
    const urladdproducts=`${apiUrl}/ret?year=${product.type_prog}&parameter=${product.duration}&college=${product.title_prog}`;
    console.log("what about this");
    return this.http.get<Product[]>(urladdproducts)
    .pipe(
      tap(products => console.log('Fetch products')),
      catchError(this.handleError('getProducts', []))
    );
}


  updateProduct (id, product): Observable<any> {
    const urlupdateproducts=`${apiUrl}/update.php?id=${id}`;
    const url = `${urlupdateproducts}`;
    return this.http.post(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct (id): Observable<Product> {
    const url = `${apiUrl}/delete.php?id=${id}`;

    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
