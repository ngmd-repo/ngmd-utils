import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IExample } from '../interfaces/example.interface';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ExampleApiService {
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('@products/products');
  }

  public getExampleData(): Observable<IExample> {
    return null;
  }

  public setExampleData(): Observable<void> {
    return null;
  }
}
