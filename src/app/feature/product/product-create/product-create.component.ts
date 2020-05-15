import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { VendorService } from 'src/app/service/vendor.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.class';
import { Vendor } from 'src/app/model/vendor.class';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
    title: string = "Product-Create";
    product: Product = new Product();
    vendors: Vendor[] = [];
    submitBtnTitle: string = "Create";

  constructor(private productSvc: ProductService,
              private vendorSvc: VendorService,
              private router: Router) { }

  ngOnInit(): void {
    this.vendorSvc.list().subscribe(jr => {
      this.vendors = jr.data as Vendor[];
      //grab list of vendors
    });
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