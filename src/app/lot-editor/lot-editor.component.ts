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

  constructor(private lotService: LotRepositoryService, private lotPhotoService: LotPhotoRepositoryService, private userService: UserRepositoryService) { }

  ngOnInit() {
  }
  photosCount: number = 1;

  getPhotosCount() {
    return new Array(this.photosCount);
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

  loadLotPhotos(){
    this.lotPhotoService.getLotPhotos(this._lot.Id).subscribe(response => {
      this._lot.LotPhotos = response;
    });
  }
  loadLotUsers(){
    this.userService.getSellerUser(this._lot.Id).subscribe(response => {
      this._lot.SellerUser = response;
    });
    this.userService.getBuyerUser(this._lot.Id).subscribe(response => {
      if (response)
        this._lot.BuyerUser = response;
    });
  }
  show: boolean = false;
  onShowClick() {
    this.show = true;
  }
  _lot: LotModel;

  lotPhotos: LotPhotoRequestModel[] = [{
    Path: "",
    Description: ""
  }];

  updateLot() {
    this.lotService.putLot(this._lot.Id, this._lot).subscribe();
    alert('request sent');
  }

  removePhoto(position: number) {
    for (var i = position; i < this.lotPhotos.length; i++) {
      this.lotPhotos[i] = this.lotPhotos[i + 1];
    }
    this.lotPhotos.pop;
    this.photosCount--;
  }

  onFileChanged(event, j) {
    this.photosCount = j + 2;
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.lotPhotos[j].Path = myReader.result.toString();
    }
    this.lotPhotos.push({
      Path: "",
      Description: ""
    });
    myReader.readAsDataURL(event.target.files[0]);
  }

  deletePhoto(photoId: number) {
    this.lotPhotoService.deleteLotPhoto(photoId).subscribe(() => { },
      () => {
        alert("Error");
      },
      () => {
        alert("Success");
        this.loadLotPhotos();
      });
  }

  deleteLot(){
    this.lotService.deleteLot(this._lot.Id).subscribe(
      () => { },
      () => {
        alert("Error");
        this.loadLotPhotos();
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
    this.lotPhotos.pop();
    this.photosCount--;
    this.lotPhotos.forEach(lotPhoto => {
      lotPhoto.Path = lotPhoto.Path.replace("data:image/jpeg;base64,", "")
    });
    this.lotPhotoService.addPhotos(this._lot.Id, this.lotPhotos).subscribe(
      () => { },
      () => {
        alert("Error");
        this.lotPhotos.forEach(lotPhoto => {
          lotPhoto.Path = lotPhoto.Path = "data:image/jpeg;base64," + lotPhoto.Path;
        });
      },
      () => {
        alert("Success");
        this.lotPhotos = [{
          Path: "",
          Description: ""
        }];
        this.photosCount = 1;
        this.loadLotPhotos();
      }
    );
  }
}
