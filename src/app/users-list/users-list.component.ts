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
  amount: number = 10;
  ngOnInit() {
  }

  selectedUser: UserAccountInfoModel;

  reload(shouldReload: boolean) {
    if (shouldReload) {
      this.loadUsers();
      this.selectedUser = null;
    }
  }

  onSelect(user: UserAccountInfoModel) {
    this.selectedUser = user;
  }

  loadUsers() {
    this.userService.getUsers(this.page, this.amount).subscribe(
      result => { this.users = result },
      response => {
        console.log(response)
        if (response.error.status == 404)
          alert(response.error);
        else
          alert(response.error.Message);
      },
      () => { }
    );
  }

}
