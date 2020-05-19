import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Router } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
    title: string = "Request-Create";
    request: Request = new Request();
    submitBtnTitle: string = "Create";

  constructor(private requestSvc: RequestService,
              private router: Router,
              private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.request.user = this.sysSvc.loggedInUser;
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