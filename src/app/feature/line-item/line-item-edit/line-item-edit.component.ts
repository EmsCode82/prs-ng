
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { Request } from 'src/app/model/request.class'
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})
export class LineItemEditComponent implements OnInit {
  title: string = "Purchase Request Line Item Edit";
  request: Request = null;
  requestId: number;
  products: Product [] = [];
  lineitem: LineItem = new LineItem();
  quantity: number;


  constructor(private productSvc: ProductService,
    private lineitemSvc: LineItemService,
    private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
    });
    this.route.params.subscribe(parms => this.requestId = parms['id']);
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
      this.lineitem.request = this.request;
    });
  }
  save() {
    this.lineitemSvc.edit(this.lineitem).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/request/request-lines/"+ this.requestId);
        console.log("Line Item Updated", this.lineitem)
      }
      else {
        console.log("*** Error updating Line Item", this.lineitem, jr.errors);
      }
    });
  }
}
