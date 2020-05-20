import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Router } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { SystemService } from 'src/app/service/system.service';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
    title: string = "Request-Create";
    submitBtnTitle: string = "Create";
    request: Request = new Request();
    users: User[] = [];
    user: User;

  constructor(private requestSvc: RequestService,
              private router: Router,
              private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.request.user = this.sysSvc.loggedInUser;
    console.log("logged in user", this.request.user);
  }
  
  save() {
    this.requestSvc.create(this.request).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/request/list");
      }
      else {
        console.log("*** Error creating new Vendor", this.request, jr.errors);
      }
    });
  }
  backClicked() {}

}