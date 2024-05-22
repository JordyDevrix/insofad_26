import { Category } from "./category.model";

export class Product {
  public imagePath: string;
  public id: number;
  public name: string;
  public description: string;
  public price: number;
  public category: Category;
}
