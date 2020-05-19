import { Product } from './product.class';
import { Request } from './request.class';

export class LineItem {
    id: number;
    request: Request;
    product: Product;
    quantity: number;
    

    constructor(id: number = 0, request: Request = new Request(),
                product: Product = new Product) {
        this.id = id;
        this.request = new Request();
        this.product = new Product();
        
        this.quantity = this.quantity;       
    }
}