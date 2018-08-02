import { Component, OnInit } from '@angular/core';
import { AccountManagementService } from '../services/account-management.service';
import { UserRegistrationModel } from '../models/user-registration-model';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private service: AccountManagementService) { }

  user: UserRegistrationModel = {
    Email: '',
    Password: '',
    ConfirmPassword: '',
    Name: '',
    Surname: '',
    TelephoneNumber: '',
    Role: '',
  }
  ngOnInit() {
  }

  register(){
    this.service.register(this.user);
    alert("request sent");
  }
}