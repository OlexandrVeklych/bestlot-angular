import { Component, OnInit } from '@angular/core';
import { LotModel } from './models/lot-model';
import { LotRepositoryService } from './services/lot-repository.service';
import { UserAccountInfoModel } from './models/user-account-info-model';
import { UserRepositoryService } from './services/user-repository.service';
import { AccountManagementService } from './services/account-management.service';
import { LotPhotoRepositoryService } from './services/lot-photo-repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private lotService: LotRepositoryService,
    private userService: UserRepositoryService,
    private accountService: AccountManagementService,
    private lotPhotoService: LotPhotoRepositoryService) { }

  currentUser: UserAccountInfoModel;

  ngOnInit() {
    if (sessionStorage.getItem("tokenKey"))
      this.userService.getCurrentUser().subscribe(
        response => {
          this.currentUser = response;
        },
        () => {
          this.logout();
        });
  }

  Id: number;

  lotById: LotModel;
  lotsByName: LotModel[];

  searchName: string;

  allLots: boolean = false;
  oneLot: boolean = false;
  createLot: boolean = false;
  searchLots: boolean = false;
  detailedSearch: boolean = false;
  register: boolean = false;
  login: boolean = false;
  allUsers: boolean = false;
  profile: boolean = false;

  reloadCurrentUser() {
    this.userService.getCurrentUser().subscribe(
      response => {
        this.currentUser = response;
      });
  }

  loadLots(event) {
    this.lotService.getLots(event.page, event.amount, this.searchName).subscribe(
      result => { this.lotsByName = result },
      () => { alert("Error") },
      () => {
        this.lotsByName.forEach(lot => {
          this.lotPhotoService.getLotPhotoByNumber(lot.Id, 0).subscribe(response => {
            lot.LotPhotos = [response];
          })
        });
      }
    );
  }

  showAllLots() {
    this.allLots = true;
    this.oneLot = false;
    this.createLot = false;
    this.searchLots = false;
    this.register = false;
    this.login = false;
    this.allUsers = false;
    this.profile = false;
    this.detailedSearch = false;
  }
  showOneLot() {
    this.allLots = false;
    this.oneLot = true;
    this.createLot = false;
    this.searchLots = false;
    this.register = false;
    this.login = false;
    this.allUsers = false;
    this.lotService.getLot(this.Id).subscribe(response => {
      this.lotById = response;
    });
    this.profile = false;
    this.detailedSearch = false;
  }

  showSearch() {
    this.allLots = false;
    this.oneLot = false;
    this.createLot = false;
    this.searchLots = true;
    this.register = false;
    this.login = false;
    this.allUsers = false;
    this.loadLots({ page: 1, amount: 10 });
    this.profile = false;
    this.detailedSearch = false;
  }
  showCreateLot() {
    this.allLots = false;
    this.oneLot = false;
    this.createLot = true;
    this.searchLots = false;
    this.register = false;
    this.login = false;
    this.allUsers = false;
    this.profile = false;
    this.detailedSearch = false;
  }
  showRegister() {
    this.allLots = false;
    this.oneLot = false;
    this.createLot = false;
    this.searchLots = false;
    this.register = true;
    this.login = false;
    this.allUsers = false;
    this.profile = false;
    this.detailedSearch = false;
  }
  showLogin() {
    this.allLots = false;
    this.oneLot = false;
    this.createLot = false;
    this.searchLots = false;
    this.register = false;
    this.login = true;
    this.allUsers = false;
    this.profile = false;
    this.detailedSearch = false;
  }
  showAllUsers() {
    this.allLots = false;
    this.oneLot = false;
    this.createLot = false;
    this.searchLots = false;
    this.register = false;
    this.login = false;
    this.allUsers = true;
    this.profile = false;
    this.detailedSearch = false;
  }

  showProfile() {
    this.allLots = false;
    this.oneLot = false;
    this.createLot = false;
    this.searchLots = false;
    this.register = false;
    this.login = false;
    this.allUsers = false;
    this.profile = true;
    this.detailedSearch = false;
  }

  showDetailedSearch() {
    this.allLots = false;
    this.oneLot = false;
    this.createLot = false;
    this.searchLots = false;
    this.register = false;
    this.login = false;
    this.allUsers = false;
    this.profile = false;
    this.detailedSearch = true;
  }

  logout() {
    this.currentUser = null;
    this.accountService.logout();
  }
}
