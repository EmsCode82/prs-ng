import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {
  title: string = "Request-Edit";
  submitBtnTitle: string = "Edit"
  request: Request = new Request();
  requestId: number = 0;

  constructor(private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
    });
  }
  save() {
    this.requestSvc.edit(this.request).subscribe(jr => {
      if (jr.errors == null) {
        // success
        this.router.navigateByUrl("/request/list")
      }
      else {
        console.log("*** Error editing request.", this.request, jr.errors);
      }
    });
  }
}