import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  title: string = "Product-Edit";
  submitBtnTitle: string = "Edit"
  product: Product = new Product();
  productId: number = 0;

  constructor(private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.productId = parms["id"]);
    this.productSvc.get(this.productId).subscribe(jr => {
      this.product = jr.data as Product;
    });
  }
  save() {
    this.productSvc.edit(this.product).subscribe(jr => {
      if (jr.errors == null) {
        // success
        this.router.navigateByUrl("/product/list")
      }
      else {
        console.log("*** Error editing product.", this.product, jr.errors);
      }
    });
  }
}