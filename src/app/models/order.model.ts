import { Customer } from "./customer.model";
import { Product } from "./product.model";
import {OrderProduct} from "./orderproduct.model";

export class Order {
  public id?: number;
  public customer?: Customer;
  public products: OrderProduct[];
  public totalPrice: number;
  public orderStatus?: string;
}
