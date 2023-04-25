import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { environment as env } from './../../environments/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Product } from './../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URI = `${env.api_uri}products`;

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.API_URI).pipe(
      map((products: any[]) =>
        products.map((product: any) => new Product(product))
      ),
      catchError(this.handleError)
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.API_URI}/${id}`).pipe(
      map((product: any) => new Product(product)),
      catchError(this.handleError)
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.API_URI, product).pipe(
      map((createdProd: any) => new Product(createdProd)),
      catchError(this.handleError)
    );
  }

  updateProduct(id: number, product: any): Observable<Product> {
    return this.httpClient
      .patch<Product>(`${this.API_URI}/${id}`, product)
      .pipe(
        map((updatedProd: any) => new Product(updatedProd)),
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<string> {
    return this.httpClient
      .delete<string>(`${this.API_URI}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }
}
