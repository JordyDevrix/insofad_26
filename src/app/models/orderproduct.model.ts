import { Category } from "./category.model";
import { ProductProperties } from "./productproperties.model";

export class OrderProduct {
    public id: number;
    public name: string;
    public imagePath: string;
    public description: string;
    public price: number;
    public color: string;
    public size: string;
    public material: string;
    public productProperties: ProductProperties;
    public brand: string;
    public category: Category;
}
