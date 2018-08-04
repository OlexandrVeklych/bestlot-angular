import { Component, OnInit } from '@angular/core';
import { LotModel } from './models/lot-model';
import { LotRepositoryService } from './services/lot-repository.service';
import { UserAccountInfoModel } from './models/user-account-info-model';
import { UserRepositoryService } from './services/user-repository.service';
import { AccountManagementService } from './services/account-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private lotService: LotRepositoryService, private userService: UserRepositoryService, private accountService: AccountManagementService){}

  currentUser: UserAccountInfoModel;

  ngOnInit() {
    if (sessionStorage.getItem("tokenKey"))
      this.userService.getCurrentUser().subscribe(response => {
        this.currentUser = response;
      },
      () => {
        sessionStorage.removeItem("tokenKey");
      })
  }

  Id: number;

  lotById: LotModel;

  searchCategory: string;

  allLots: boolean = false;
  oneLot: boolean = false;
  createLot: boolean = false;
  searchLot: boolean = false;
  register: boolean = false;
  login: boolean = false;
  allUsers: boolean = false;
  profile: boolean = false;



  showAllLots(){
    this.allLots = true;
    this.oneLot = false;
    this.createLot = false;
    this.searchLot = false;
    this.register = false;
    this.login = false;
    this.allUsers = false;
    this.profile = false;
  }
  showOneLot(){
    this.allLots = false;
    this.oneLot = true;
    this.createLot = false;
    this.searchLot = false;
    this.register = false;
    this.login = false;
    this.allUsers = false;
    this.lotService.getLot(this.Id).subscribe(response => {
      this.lotById = response;
    });
    this.profile = false;
  }

  showSearch(){
    this.allLots = false;
    this.oneLot = false;
    this.createLot = false;
    this.searchLot = true;
    this.register = false;
    this.login = false;
    this.allUsers = false;
    this.lotService.getLots(1, 10, null, this.searchCategory ).subscribe(response => {
      this.lotById = response[0];
    });
    this.profile = false;
  }
  showCreateLot(){
    this.allLots = false;
    this.oneLot = false;
    this.createLot = true;
    this.searchLot = false;
    this.register = false;
    this.login = false;
    this.allUsers = false;
    this.profile = false;
  }
  showRegister(){
    this.allLots = false;
    this.oneLot = false;
    this.createLot = false;
    this.searchLot = false;
    this.register = true;
    this.login = false;
    this.allUsers = false;
    this.profile = false;
  }
  showLogin(){
    this.allLots = false;
    this.oneLot = false;
    this.createLot = false;
    this.searchLot = false;
    this.register = false;
    this.login = true;
    this.allUsers = false;
    this.profile = false;
  }
  showAllUsers(){
    this.allLots = false;
    this.oneLot = false;
    this.createLot = false;
    this.searchLot = false;
    this.register = false;
    this.login = false;
    this.allUsers = true;
    this.profile = false;
  }

  showProfile(){
    this.allLots = false;
    this.oneLot = false;
    this.createLot = false;
    this.searchLot = false;
    this.register = false;
    this.login = false;
    this.allUsers = false;
    this.profile = true;
  }

  logout(){
    this.currentUser = null;
    this.accountService.logout();
  }
}
