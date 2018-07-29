import { Component, OnInit } from '@angular/core';
import { UserRepositoryService } from '../services/user-repository.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private service: UserRepositoryService) { }

  usersCount: number;

  ngOnInit() {
    this.service.getUsers(1, 10).subscribe();
  }



}
