import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductsService} from "../services/products.service";
import {Product} from "../models/product.model";
import {CurrencyPipe} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {Category} from "../models/category.model";
import {CategoryService} from "../services/category.service";
import {ProductProperties} from "../models/productproperties.model";
import {NavComponent} from "./nav/nav.component";

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CurrencyPipe,
        RouterLink,
        NavComponent
    ],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
    public productProperties: ProductProperties[] = [];
    public products: Product[] = [];
    public categories: Category[] = [];
    public addProduct: FormGroup;
    public addVariant: FormGroup;

    constructor(
        private productsService: ProductsService,
        private categoryService: CategoryService,
        private fb: FormBuilder,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.productsService.getProducts().subscribe((products) => {
            this.products = products;
        });
        this.categoryService.getCategories().subscribe((categories) => {
            this.categories = categories;
            console.log(categories);
        });

        this.addProduct = this.fb.group({
            name: ['', [Validators.required]],
            brand: [null],
            description: ['', [Validators.required]],
            imagePath: ['', [Validators.required]],
            category_id: ['', [Validators.required]],
        });
        this.addVariant = this.fb.group({
            product_id: ['', [Validators.required]],
            size: ['', [Validators.required]],
            material: ['', [Validators.required]],
            color: ['', [Validators.required]],
            price: ['', [Validators.required]],
        });
    }

    onRemoveProduct(id: number) {
        this.productsService.removeProduct(id).subscribe(() => {
            this.products = this.products.filter(product => product.id !== id);
        });
        window.location.reload();
    }

    onAddProduct() {
        const product = this.addProduct.value;
        console.log(product);
        this.productsService.addProduct(product).subscribe((product) => {
            this.products.push(product);
        });
        window.location.reload();
    }

    onRemoveVariant(id: number) {
        this.productsService.removeVariant(id).subscribe(() => {
            this.products = this.products.filter(product => product.id !== id);
            console.log(id)
        });
        window.location.reload();
    }

    onAddVariant() {
        const variant = this.addVariant.value;
        console.log(variant);
        this.productsService.addVariant(variant, variant.product_id).subscribe((variant) => {
            this.productProperties.push(variant);
        });
        window.location.reload();
    }
}
