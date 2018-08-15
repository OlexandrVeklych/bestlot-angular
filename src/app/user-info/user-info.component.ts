import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LotRepositoryService } from '../services/lot-repository.service';
import { UserAccountInfoModel } from '../models/user-account-info-model';
import { AccountManagementService } from '../services/account-management.service';
import { LotModel } from '../models/lot-model';
import { LotCommentRepositoryService } from '../services/lot-coment-repository.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private lotCommentService: LotCommentRepositoryService,
    private lotService: LotRepositoryService,
    private accountService: AccountManagementService) { }

  _currentUser: UserAccountInfoModel;
  
  @Input()
  set currentUser(currentUser: UserAccountInfoModel) {
    this._currentUser = currentUser;
    this.showComments = false;
    this.showLots = false;
  }

  ngOnInit() {
  }

  selectedLot: LotModel;
  showLots: boolean = false;
  showComments: boolean = false;

  @Output() shouldReload = new EventEmitter<boolean>();

  selectLot(lot: LotModel) {
    this.selectedLot = lot;
  }

  loadLots(event) {
    //If event == null, it means that we pressed button LoadLots on this component,
    //so we download 1 page, 10 lots
    if (!event)
      this.lotService.getUserLots(this._currentUser.Email, 1, 10).subscribe(
        response => {
          this._currentUser.Lots = response;
          this.showLots = true;
          this.showComments = false;
        },
        response => {
          console.log(response)
          if (response.error.status == 404)
            alert(response.error);
          else
            alert(response.error.Message);
        });
    //If event != null, it means that inner lots-list asked to reload lots by emiting event with
    //page and amount, so we load lots with event.page, event.amount
    else
      this.lotService.getUserLots(this._currentUser.Email, event.page, event.amount).subscribe(
        response => {
          this._currentUser.Lots = response;
          this.showLots = true;
          this.showComments = false;
        },
        response => {
          console.log(response)
          if (response.error.status == 404)
            alert(response.error);
          else
            alert(response.error.Message);
        });
  }

  loadComments() {
    this.lotCommentService.getUserLotComments(this._currentUser.Email, 1, 10).subscribe(
      response => {
        this._currentUser.LotComments = response;
        this.showLots = false;
        this.showComments = true;
      },
      response => {
        console.log(response)
        if (response.error.status == 404)
          alert(response.error);
        else
          alert(response.error.Message);
      });
  }

  deleteUser() {
    if (!confirm("This will delete account and all lots. Delete account?"))
      return;
    if (!confirm("Account can`t be restored. Delete account?"))
      return;
    if (!confirm("Maybe no?"))
      return;
    if (!confirm("Please.."))
      return;
    if (!confirm("*cries*"))
      return;
    alert("Ой всё!")
    this.accountService.deleteAccount(this._currentUser.Email).subscribe(
      () => { },
      response => {
        console.log(response)
        if (response.error.status == 404)
          alert(response.error);
        else
          alert(response.error.Message);
      },
      () => {
        alert("Success");
        this.shouldReload.emit(true);
      });
  }
}
