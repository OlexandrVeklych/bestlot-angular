import { Component, OnInit } from '@angular/core';
import { AccountManagementService } from '../services/account-management.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  constructor(private service: AccountManagementService) { }

  email: string;

  password: string;

  ngOnInit() {
  }


  login(){
    this.service.login(this.email, this.password);
    alert('request sent');
  }
}
