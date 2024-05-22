import { Customer } from "./customer.model";
import { Product } from "./product.model";

export class Order {
  public id?: number;
  public customer?: Customer;
  public products: Product[];
  public totalPrice: number;
  public orderStatus?: string;
}
