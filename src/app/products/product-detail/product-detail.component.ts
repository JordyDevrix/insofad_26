import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { Category } from '../../models/category.model';
import { AuthService } from '../../auth/auth.service';
import { CartService } from '../../services/cart.service';
import { OrderProduct } from '../../models/orderproduct.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit{
  @Output() public onBuyProduct: EventEmitter<Product> = new EventEmitter<Product>();
  @Input() public product!: Product;
  //public product: Product;
  public category: Category;
  private productId: number;
  public userIsLoggedIn: boolean = false;
  public text: string = 'Add to cart';
  public clickedStyle: string = '#FFF';
  public showPlus: boolean = true;
  public productProperties: any;
  public orderProduct: OrderProduct;
  public productToBuy: OrderProduct;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private authService: AuthService,
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.checkLoginState();

    this.activatedRoute.params.subscribe(params => {
      this.productId = params['id'];
    });

    this.productsService
      .getProductByIndex(this.productId)
      .subscribe((product: Product) => {
        this.product = product;
        this.productProperties = product.productProperties;
      });
  }

  public buyProduct(product: Product, index: number): void {
    console.log(product);
    this.productToBuy = {
        id: product.id,
        name: product.name,
        imagePath: product.imagePath,
        description: product.description,
        price: product.productProperties[index].price,
        color: product.productProperties[index].color,
        size: product.productProperties[index].size,
        material: product.productProperties[index].material,
        productProperties: product.productProperties[index],
        brand: product.brand,
        category: product.category,
    }
    console.log("Product gekocht")
    this.cartService.addProductToCart(this.productToBuy);
  }

  public checkLoginState(): void{

    this.authService
      .$userIsLoggedIn
      .subscribe((loginState: boolean) => {
        this.userIsLoggedIn = loginState;
      });
  }

}
