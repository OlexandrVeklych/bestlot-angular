import { Component, OnInit, Input } from '@angular/core';
import { UserRepositoryService } from '../services/user-repository.service';
import { LotRepositoryService } from '../services/lot-repository.service';
import { UserAccountInfoModel } from '../models/user-account-info-model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private userService: UserRepositoryService, private lotService: LotRepositoryService) { }

  @Input() currentUser: UserAccountInfoModel;

  ngOnInit() {
  }

  putUser(){
    this.userService.putUser(this.currentUser.Email, this.currentUser).subscribe();
  }

  deleteLot(lotId: number){
    this.lotService.deleteLot(lotId).subscribe(response => {
      console.log(response);
    });
    alert("Delete request sent");
  }
}
