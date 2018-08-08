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

  constructor(private lotCommentService: LotCommentRepositoryService, private lotService: LotRepositoryService, private accountService: AccountManagementService) { }

  @Input() currentUser: UserAccountInfoModel;

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
    if (!event)
      this.lotService.getUserLots(this.currentUser.Email, 1, 10).subscribe(response => {
        this.currentUser.Lots = response;
        this.showLots = true;
        this.showComments = false;
      })
    else
    this.lotService.getUserLots(this.currentUser.Email, event.page, event.amount).subscribe(response => {
      this.currentUser.Lots = response;
      this.showLots = true;
      this.showComments = false;
    })
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
    this.accountService.deleteAccount(this.currentUser.Email).subscribe(
      () => { },
      () => { alert("Error") },
      () => {
        alert("Success");
        this.shouldReload.emit(true);
      });
    alert("Delete request sent");
  }

  loadComments() {
    this.lotCommentService.getUserLotComments(this.currentUser.Email, 1, 10).subscribe(response => {
      this.currentUser.LotComments = response;
      this.showLots = false;
      this.showComments = true;
    })
  }
  //submit(){
  //this.lot.LotPhotos.pop();
  //this.photosCount--;
  //this.lot.LotPhotos.forEach(lotPhoto => {
  //    lotPhoto.Path = lotPhoto.Path.replace("data:image/jpeg;base64,","")
  //  });
  //  this.service.postLot(this.lot).subscribe();
  //  alert('request sent');
  //}
  //
  //removePhoto(position: number){
  //  for(var i = position; i < this.lot.LotPhotos.length; i++){
  //    this.lot.LotPhotos[i] = this.lot.LotPhotos[i + 1];
  //  }
  //  this.lot.LotPhotos.pop;
  //  this.photosCount--;
  //}
  //
  //onFileChanged(event, j){
  //  console.log(event);
  //  this.photosCount = j + 2;
  //  var myReader:FileReader = new FileReader();
  //
  //  myReader.onloadend = (e) => {
  //    this.lot.LotPhotos[j].Path = myReader.result.toString();
  //  }
  //  this.lot.LotPhotos.push({
  //    Path: "",
  //    Description: ""
  //  });
  //  myReader.readAsDataURL(event.target.files[0]);
  //  console.log(this.lot.LotPhotos[j]);
  //}
}
