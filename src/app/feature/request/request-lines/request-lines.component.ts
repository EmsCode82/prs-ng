import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { User } from 'src/app/model/user.class';

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
  lineitemId: number = 0;
  requestId: number = 0;
  loggedInUser: User = new User; 

  constructor(private lineitemSvc: LineItemService,
              private requestSvc: RequestService,
              private sysSvc: SystemService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.route.params.subscribe(parms => this.requestId = parms["id"]);    
    // call the new lines-for-pr method to get the line items for the request
    this.lineitemSvc.linesforpr(this.requestId).subscribe(jr => {
      this.lineitems = jr.data as LineItem[];
      console.log("Line Items Found!", this.lineitems);
    });
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
      console.log("Request Found!", this.request);
      // call requestSvc.get method to get the request for the id found above
    });  
  }
  delete(lineItemId: number) {
    this.lineitemSvc.delete(lineItemId).subscribe(jr => {
      if (jr.errors == null) {
        console.log(jr.data);
        // refresh
        this.requestSvc.get(this.requestId).subscribe(jr => {
          this.request = jr.data as Request;
          console.log ("Found Request", this.request);
        });
        // refresh
        this.lineitemSvc.linesforpr(this.requestId).subscribe(jr => {
          this.lineitems = jr.data as LineItem[];
          console.log("List of Line Items", this.lineitems);
        });
      }
      else{
        console.log("*** Error deleting Line Item ***", lineItemId, jr.errors);
      }
    });
  }
  submitForReview(){
    this.requestSvc.submitForReview(this.request).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/request/list");
      }
      else {
        console.log("***Error submitting request.", this.request, jr.errors);
      }
    })
  }
}