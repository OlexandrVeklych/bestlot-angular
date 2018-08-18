import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LotRepositoryService } from '../services/lot-repository.service';
import { LotModel } from '../models/lot-model';
import { LotPhotoModel } from '../models/lot-photo-model';
import { LotPhotoRequestModel } from '../models/lot-photo-request-model';
import { LotPhotoRepositoryService } from '../services/lot-photo-repository.service';
import { UserRepositoryService } from '../services/user-repository.service';

@Component({
  selector: 'app-lot-editor',
  templateUrl: './lot-editor.component.html',
  styleUrls: ['./lot-editor.component.css']
})
export class LotEditorComponent implements OnInit {

  constructor(private lotService: LotRepositoryService,
    private lotPhotoService: LotPhotoRepositoryService,
    private userService: UserRepositoryService) { }

  show: boolean = false;
  _lot: LotModel;
  lotPhotos: LotPhotoRequestModel[] = [];

  ngOnInit() {
  }

  @Input()
  set lot(lot: LotModel) {
    if (!lot)
      return;
    this._lot = lot;
    this.loadLotUsers();
    this.loadLotPhotos();
    this.show = false;
  }

  @Output() shouldReload = new EventEmitter<boolean>();

  getStartDate(): string {
    return new Date(this._lot.StartDate).toLocaleString();
  }

  getSellDate(): string {
    return new Date(this._lot.SellDate).toLocaleString();
  }

  canChangeStartDate(): boolean {
    return !(this._lot.BuyerUserId
      || this._lot.BidPlacer != "Relative"
      || new Date().getTime() > new Date(this._lot.StartDate).getTime());
  }

  loadLotPhotos() {
    this.lotPhotoService.getLotPhotos(this._lot.Id).subscribe(
      response => {
        this._lot.LotPhotos = response;
      },
      response => {
        console.log(response)
        if (response.error.status == 404)
          alert(response.error);
        else
          alert(response.error.Message);
      });
  }

  getPhotosCount() {
    return new Array(this.lotPhotos.length + 1);
  }

  removePhoto(i: number) {
    this.lotPhotos.splice(i, 1);
    this.replaceInputElem(i);
  }

  replaceInputElem(i: number) {
    var inputElem = <HTMLInputElement>document.getElementById("input" + i);
    var nextInputElem = <HTMLInputElement>document.getElementById("input" + (i + 1));

    if (!nextInputElem) {
      inputElem.value = "";
      console.log(this.lotPhotos);
      return;
    }

    inputElem.files = nextInputElem.files;

    this.replaceInputElem(i + 1);
  }

  loadLotUsers() {
    this.userService.getSellerUser(this._lot.Id).subscribe(
      response => {
        this._lot.SellerUser = response;
      },
      response => {
        console.log(response)
        if (response.error.status == 404)
          alert(response.error);
        else
          alert(response.error.Message);
      },
      () => { this.show = true });
    this.userService.getBuyerUser(this._lot.Id).subscribe(
      response => {
        if (response)
          this._lot.BuyerUser = response;
      },
      response => {
        console.log(response)
        if (response.error.status == 404)
          alert(response.error);
        else
          alert(response.error.Message);
      });
  }

  onShowClick() {
    this.show = true;
  }

  updateLot() {
    this.lotService.putLot(this._lot.Id, this._lot).subscribe(
      () => { },
      response => {
        console.log(response)
        if (response.error.status == 404)
          alert(response.error);
        else
          alert(response.error.Message);
      },
      () => { alert("Success") });
  }

  onFileChanged(event, i: number) {
    if (!event.target.files[0])
      return;
    console.log(event);
    var myReader: FileReader = new FileReader();
    var lotPhoto: LotPhotoRequestModel = {
      Path: "",
      Description: ""
    }
    myReader.onloadend = (e) => {
      lotPhoto.Path = myReader.result.toString();
    }
    myReader.readAsDataURL(event.target.files[0]);
    this.lotPhotos[i] = lotPhoto;
  }

  deletePhoto(photoId: number) {
    this.lotPhotoService.deleteLotPhoto(photoId).subscribe(
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
        this.loadLotPhotos();
      });
  }

  deleteLot() {
    this.lotService.deleteLot(this._lot.Id).subscribe(
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
        this.show = false;
        this._lot = null;
        this.shouldReload.emit(true);
      }
    );
  }

  loadPhotos() {
    this.lotPhotos.forEach(lotPhoto => {
      lotPhoto.Path = lotPhoto.Path.replace("data:image/jpeg;base64,", "")
    });
    this.lotPhotoService.addPhotos(this._lot.Id, this.lotPhotos).subscribe(
      () => { },
      response => {
        console.log(response)
        if (response.error.status == 404)
          alert(response.error);
        else
          alert(response.error.Message);
        this.lotPhotos.forEach(lotPhoto => {
          lotPhoto.Path = lotPhoto.Path = "data:image/jpeg;base64," + lotPhoto.Path;
        });
      },
      () => {
        alert("Success");
        for (var i = 0; i <= this.lotPhotos.length; i++)
          this.removePhoto(0);
        this.loadLotPhotos();
      }
    );
  }
}
