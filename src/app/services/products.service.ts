import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {Product} from '../models/product.model';
import {Category} from "../models/category.model";
import {ProductProperties} from "../models/productproperties.model";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private baseUrl: string = environment.base_url + "/products";

    constructor(private http: HttpClient) {
    }

    public getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl);
    }

    public addProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.baseUrl, product);
    }

    public getProductByIndex(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.baseUrl}/${id}`);
    }

    public updateProductByIndex(id: number, product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
    }

    public removeProduct(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    public removeVariant(id: number) {
        return this.http.delete<void>(`${this.baseUrl}/variant/${id}`);
    }

    public addVariant(variant: ProductProperties, id: number) {
        return this.http.post<ProductProperties>(`${this.baseUrl}/properties/${id}`, variant);

    }

    public updateProduct(product: Product) {
        return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product);
    }

    public updateProductProperties(propertyId: number, property: ProductProperties) {
        return this.http.put<Product>(`${this.baseUrl}/properties/${propertyId}`, property);
    }

    public buyProductWithAmount(propertyId: number, amount: number, property: ProductProperties) {
        return this.http.put<Product>(`${this.baseUrl}/properties/${propertyId}/${amount}`, property);
    }
}
