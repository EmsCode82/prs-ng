import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { User } from 'src/app/model/user.class';


@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit {
  title: string = "Purchase Request Review";  
  requests: Request [] =  [];  
  loggedInUser: User = new User;  

  constructor(private requestSvc: RequestService,
              private sysSvc: SystemService,              
              ) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.loggedInUser = this.sysSvc.loggedInUser;    
    this.requestSvc.listInReviewNotLoggedIn(this.loggedInUser.id).subscribe(jr => {
      console.log("jr", jr);
      this.requests = jr.data as Request[];
      console.log("List of requests: ", this.requests);
    });
  }  
}

