import { Injectable } from '@angular/core';


import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ShippingCostsService {
    private shippingCosts: number = 99.95;

    constructor() { }

    public getShippingCosts(): number {
        return this.shippingCosts;
    }
}
