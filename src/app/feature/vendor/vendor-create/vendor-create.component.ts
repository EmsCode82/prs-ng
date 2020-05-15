import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/service/vendor.service';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/model/vendor.class';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {
    title: string = "Vendor-Create";
    vendor: Vendor = new Vendor();
    submitBtnTitle: string = "Create";

  constructor(private vendorSvc: VendorService,
              private router: Router) { }

  ngOnInit(): void {
    // do nothing
  }
  
  save() {
    this.vendorSvc.create(this.vendor).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/vendor/list");
      }
      else {
        console.log("*** Error creating new Vendor", this.vendor, jr.errors);
      }
    });
  }
  backClicked() {}

}