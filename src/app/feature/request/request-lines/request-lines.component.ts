import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent implements OnInit {
  title: string = "Purchase Request List";
  title2: string = "Line Items";
  request: Request = new Request();
  lineitems: LineItem []= [];
  requestId: number = 0;

  constructor(private lineitemSvc: LineItemService,
    private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.requestId = parms["id"]);    
    // call the new lines-for-pr method to get the line items for the request
    this.lineitemSvc.linesforpr(this.requestId).subscribe(jr => {
      this.lineitems = jr.data as LineItem[];
      console.log("Line Item Found!", this.lineitems)
    });
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
      console.log("Request Found!", this.request)
      // call requestSvc.get method to get the request for the id found above
    });
  
  }
}