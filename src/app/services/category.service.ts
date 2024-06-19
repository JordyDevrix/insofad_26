import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {Category} from "../models/category.model";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private baseUrl: string = environment.base_url + "/categories";

    constructor(private http: HttpClient) {
    }

    public getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseUrl);
    }
}
