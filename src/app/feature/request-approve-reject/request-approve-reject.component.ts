import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Request } from 'src/app/model/request.class';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-request-approve-reject',
  templateUrl: './request-approve-reject.component.html',
  styleUrls: ['./request-approve-reject.component.css']
})
export class RequestApproveRejectComponent implements OnInit {
  title: string = "Purchase Request Approve/Reject";
  title2: string = "Lines";
  request: Request = null;
  requestId: number = 0;
  lineitems: LineItem []= [];
  lineitemId: number = 0;
  loggedInUser: User = new User;

  constructor(private requestSvc: RequestService,
              private sysSvc: SystemService,
              private lineitemSvc: LineItemService,
              private route: ActivatedRoute,
              private router: Router, ) { }

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
    
  approve() {
    this.requestSvc.approve(this.request).subscribe(jr => {
      if (jr.errors == null) {
          this.router.navigateByUrl("/request-review/review");
      }
      else {
        console.log("***Error submitting request for review.", this.request, jr.errors);
      }
    });
    
  }

}

