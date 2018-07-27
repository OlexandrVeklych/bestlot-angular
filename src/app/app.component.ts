import { Component } from '@angular/core';
import { LotModel } from './models/lot-model';
import { LotRepositoryService } from './services/lot-repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private service: LotRepositoryService){}

  Id: number;

  lotById: LotModel;

  allLots: boolean = false;
  oneLot: boolean = false;
  createLot: boolean = false;
  register: boolean = false;
  login: boolean = false;
  allUsers: boolean = false;

  showAllLots(){
    this.allLots = true;
    this.oneLot = false;
    this.createLot = false;
    this.register = false;
    this.login = false;
    this.allUsers = false;
  }
  showOneLot(){
    this.allLots = false;
    this.oneLot = true;
    this.createLot = false;
    this.register = false;
    this.login = false;
    this.allUsers = false;
    this.service.getLot(this.Id).subscribe(response => {
      this.lotById = response;
    });
  }
  showCreateLot(){
    this.allLots = false;
    this.oneLot = false;
    this.createLot = true;
    this.register = false;
    this.login = false;
    this.allUsers = false;
  }
  showRegister(){
    this.allLots = false;
    this.oneLot = false;
    this.createLot = false;
    this.register = true;
    this.login = false;
    this.allUsers = false;
  }
  showLogin(){
    this.allLots = false;
    this.oneLot = false;
    this.createLot = false;
    this.register = false;
    this.login = true;
    this.allUsers = false;
  }
  showAllUsers(){
    this.allLots = false;
    this.oneLot = false;
    this.createLot = false;
    this.register = false;
    this.login = false;
    this.allUsers = true;
  }
}
