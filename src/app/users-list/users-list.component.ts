import { Component, OnInit } from '@angular/core';
import { UserRepositoryService } from '../services/user-repository.service';
import { UserAccountInfoModel } from '../models/user-account-info-model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private userService: UserRepositoryService) { }

  users: UserAccountInfoModel[] = []

  page: number = 1;

  ngOnInit() {
  }

  selectedUser: UserAccountInfoModel;

  reload(shouldReload: boolean) {
    if (shouldReload){
      this.loadUsers();
      this.selectedUser = null;
    }
  }

  onSelect(user: UserAccountInfoModel){
    this.selectedUser = user;
  }

  loadUsers(){
    this.userService.getUsers(this.page, 10).subscribe(
      result => { this.users = result },
      () => { alert("Error") },
      () => { }
    );
  }

}
