import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Request } from 'src/app/model/request.class';
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { User } from 'src/app/model/user.class';
import { SystemService } from 'src/app/service/system.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-request-approve-reject',
  templateUrl: './request-approve-reject.component.html',
  styleUrls: ['./request-approve-reject.component.css']
})
export class RequestApproveRejectComponent implements OnInit {
  title: string = "Purchase Request Approve/Reject";
  title2: string = "Lines";
  lineitems: LineItem []= [];
  request: Request = new Request();
  requestId: number = 0;
  loggedInUser: User = new User;  

  constructor(private requestSvc: RequestService,              
              private lineitemSvc: LineItemService,
              private sysSvc: SystemService,
              private route: ActivatedRoute,
              private router: Router              
              ) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.route.params.subscribe(parms => this.requestId = parms["id"]);    
    this.lineitemSvc.linesforpr(this.requestId).subscribe(jr => {
      this.lineitems = jr.data as LineItem[];
      console.log("Line Items Found!", this.lineitems);
    });
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
      console.log("Request Found!", this.request);      
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
  reject() {
    this.requestSvc.reject(this.request).subscribe(jr => {
      if (jr.errors == null) {
          this.router.navigateByUrl("/request-review/review");
      }
      else {
        console.log("***Error submitting request for review.", this.request, jr.errors);
      }
    });
}
}


