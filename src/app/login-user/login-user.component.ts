import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output() shouldReload = new EventEmitter<boolean>();

  login() {
    this.service.login(this.email, this.password).subscribe(response => {
      sessionStorage.setItem("tokenKey", response.access_token)
    },
      () => {
        alert("Wrong password")
      },
      () => {
        alert("Welcome");
        this.shouldReload.emit(true);
      });
  }
}
