import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { LineItem } from 'src/app/model/line-item.class';
import { ProductService } from 'src/app/service/product.service';
import { LineItemService } from 'src/app/service/line-item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css']
})
export class LineItemCreateComponent implements OnInit {
  title: string = "LineItem-Create";
  submitBtnTitle: string = "Create";
  quantity: number;
  products: Product [] = [];
  lineitem: LineItem [] = [];
  requestId: number;

  constructor(private productSvc: ProductService,
              private lineitemSvc: LineItemService,
              private requestSvc: RequestService,              
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.requestId = parms['id']);
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product [];
    });
  }
  save() {
    this.requestSvc.create(this.lineitem).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/lineitem/list");
      }
      else {
        console.log("*** Error creating new Line Item", this.lineitem, jr.errors);
      }
    });

}
}
