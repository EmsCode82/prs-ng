import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string = "Home-Component";

  constructor(protected sysSvc: SystemService) {
  }

  ngOnInit(): void {
    console.log("User List - Verify we have a logged in user!");
    //console.log("User:",this.loggedInUser);
    //console.log("Admin?",this.isAdmin);
    this.sysSvc.checkLogin();
    console.log("home component logged in user",this.sysSvc.loggedInUser);
    console.log("Is this user an admin?",this.sysSvc.isAdmin());
  }

}