import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title: string = "Product-List"
  products: Product[] = [];
  constructor(private productSvc: ProductService) { }

  ngOnInit(): void {
    this.productSvc.list().subscribe(jr => {
      console.log("jr", jr);
      this.products = jr.data as Product[];
      console.log("List of products: ", this.products)
    });
  }

}
