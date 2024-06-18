import {Component, Output} from '@angular/core';

import {CartService} from '../services/cart.service';
import {Product} from '../models/product.model';
import {ProductsService} from '../services/products.service';
import {AuthService} from '../auth/auth.service';
import {OrderProduct} from "../models/orderproduct.model";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss'
})
export class ProductsComponent {
    public productList: Product[] = new Array<Product>();
    public loadedProducts: Product[] = new Array<Product>();
    public loadingProducts: boolean = true;
    public orderProduct: OrderProduct;
    selectedCategory: string;
    userIsLoggedIn: boolean;

    constructor(private productsService: ProductsService, private cartService: CartService, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.productsService
            .getProducts()
            .subscribe((products: Product[]) => {
                this.loadingProducts = false;
                this.productList = products;
                this.loadedProducts = this.productList;
                this.checkLoginState();
            });
    }

    public onBuyProduct(orderProduct: OrderProduct) {
        if (this.userIsLoggedIn) {
            this.cartService.addProductToCart(orderProduct);
        } else {
            alert("Please log in to add products to your cart")
        }
    }

    filterBy(event: Event) {
        this.selectedCategory = (event.target as HTMLSelectElement).value;

        if (this.selectedCategory === 'All products') {
            this.loadedProducts = this.productList;
        } else {
            this.loadedProducts = this.productList.filter(product =>
                product.category.name === this.selectedCategory)
        }
    }

    SortBy(event: Event) {
        const selectedSortMethod = (event.target as HTMLSelectElement).value;
        if (selectedSortMethod === 'Name ASC') {
            this.loadedProducts = this.loadedProducts.sort((productA: any, productB: any) => productA.name.localeCompare(productB.name));
        } else if (selectedSortMethod === 'Name DESC') {
            this.loadedProducts = this.loadedProducts.sort((productA: any, productB: any) => productB.name.localeCompare(productA.name));
        } else if (selectedSortMethod === 'Price ASC') {
            this.loadedProducts = this.loadedProducts.sort((productA, productB) => productA.productProperties[0].price - productB.productProperties[0].price);
        } else if (selectedSortMethod === 'Price DESC') {
            this.loadedProducts = this.loadedProducts.sort((productA, productB) => productB.productProperties[0].price - productA.productProperties[0].price);
        }
    }

    public checkLoginState() {
        this.authService
            .$userIsLoggedIn
            .subscribe((loginState: boolean) => {
                this.userIsLoggedIn = loginState;
            });
    }
}
