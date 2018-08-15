import { Component, OnInit, Input } from '@angular/core';
import { UserRepositoryService } from '../services/user-repository.service';
import { LotRepositoryService } from '../services/lot-repository.service';
import { AccountManagementService } from '../services/account-management.service';
import { UserAccountInfoModel } from '../models/user-account-info-model';
import { LotModel } from '../models/lot-model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserRepositoryService,
    private lotService: LotRepositoryService,
    private accountService: AccountManagementService) { }

  @Input() currentUser: UserAccountInfoModel;

  ngOnInit() {
  }

  selectedLot: LotModel;

  selectLot(lot: LotModel) {
    this.selectedLot = lot;
  }

  reload(shouldReload: boolean) {
    if (shouldReload) {
      this.loadLots();
      this.selectedLot = null;
    }
  }

  putUser() {
    this.userService.putUser(this.currentUser.Email, this.currentUser).subscribe(
      () => { },
      response => {
        console.log(response)
        if (response.error.status == 404)
          alert(response.error);
        else
          alert(response.error.Message);
      },
      () => { alert("Profile updated") });
  }

  deleteLot(lotId: number) {
    this.lotService.deleteLot(lotId).subscribe(
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
        this.loadLots();
      });
  }

  deleteCurrentUser() {
    if (confirm("This will delete your account and all lots. Delete account?")) {
      var password = prompt("Password")
      this.accountService.validatePassword(this.currentUser.Email, password).subscribe(() => { },
        () => { alert("Wrong password") },
        () => {
          this.accountService.deleteAccount(this.currentUser.Email).subscribe(
            () => { },
            response => {
              console.log(response)
              if (response.error.status == 404)
                alert(response.error);
              else
                alert(response.error.Message);
            },
            () => {
              alert("Deleted successfully");
              this.accountService.logout();
              location.reload();
            });
        });
    }
  }

  loadLots() {
    this.lotService.getUserLots(this.currentUser.Email, 1, 10).subscribe(response => {
      this.currentUser.Lots = response;
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
