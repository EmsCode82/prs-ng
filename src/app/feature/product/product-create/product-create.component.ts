import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.class';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
    title: string = "Product-Create";
    product: Product = new Product();
    submitBtnTitle: string = "Create";

  constructor(private productSvc: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    // do nothing
  }
  
  save() {
    this.productSvc.create(this.product).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/product/list");
      }
      else {
        console.log("*** Error creating new Product", this.product, jr.errors);
      }
    });
  }
  backClicked() {}

}