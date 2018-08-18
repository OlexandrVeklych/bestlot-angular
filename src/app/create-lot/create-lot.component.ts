import { Component, OnInit, ViewChild } from '@angular/core';
import { LotRequestModel } from '../models/lot-request-model';
import { LotRepositoryService } from '../services/lot-repository.service';
import { LotPhotoRequestModel } from '../models/lot-photo-request-model';

@Component({
  selector: 'app-create-lot',
  templateUrl: './create-lot.component.html',
  styleUrls: ['./create-lot.component.css']
})
export class CreateLotComponent implements OnInit {

  constructor(private lotService: LotRepositoryService) { }

  determinedSelldate: boolean = true;
  startNow: boolean = true;
  days: number = 0;
  hours: number = 1;
  minutes: number = 0;
  seconds: number = 0;

  lot: LotRequestModel = {
    Name: "",
    Description: "",
    Category: "",
    StartDate: null,
    SellDate: null,
    Price: 0,
    Currency: "",
    MinStep: 0,
    LotPhotos: [],
    BidPlacer: "Determined"
  };

  ngOnInit() {
  }

  getPhotosCount() {
    return new Array(this.lot.LotPhotos.length + 1);
  }

  removePhoto(i: number) {
    this.lot.LotPhotos.splice(i, 1);
    this.replaceInputElem(i);
  }

  replaceInputElem(i: number) {
    var inputElem = <HTMLInputElement>document.getElementById("input" + i);
    var nextInputElem = <HTMLInputElement>document.getElementById("input" + (i + 1));

    if (!nextInputElem) {
      inputElem.value = "";
      console.log(this.lot.LotPhotos);
      return;
    }

    inputElem.files = nextInputElem.files;

    this.replaceInputElem(i + 1);
  }

  addLot() {
    this.lot.LotPhotos.forEach(lotPhoto => {
      lotPhoto.Path = lotPhoto.Path.replace("data:image/jpeg;base64,", "")
    });
    var now = new Date();
    console.log(now);
    if (this.startNow)
      this.lot.StartDate = now;
    this.lot.StartDate = new Date(this.lot.StartDate);
    this.lot.StartDate = new Date(
      this.lot.StartDate.getFullYear(),
      this.lot.StartDate.getMonth(),
      this.lot.StartDate.getDate(),
      this.lot.StartDate.getHours() + 3,
      this.lot.StartDate.getMinutes(),
      this.lot.StartDate.getSeconds()
    )
    if (!this.determinedSelldate) {
      this.lot.BidPlacer = "Relative";
      this.lot.SellDate = new Date(
        this.lot.StartDate.getFullYear(),
        this.lot.StartDate.getMonth(),
        this.lot.StartDate.getDate() + this.days,
        this.lot.StartDate.getHours() + this.hours,
        this.lot.StartDate.getMinutes() + this.minutes,
        this.lot.StartDate.getSeconds() + this.seconds
      )
    }
    this.lotService.postLot(this.lot).subscribe(
      () => { },
      response => {
        console.log(response)
        if (response.error.status == 404)
          alert(response.error);
        else
          alert(response.error.Message);
        this.lot.LotPhotos.forEach(lotPhoto => {
          lotPhoto.Path = lotPhoto.Path = "data:image/jpeg;base64," + lotPhoto.Path;
        });
      },
      () => {
        alert("Success");
        for (var i = 0; i <= this.lot.LotPhotos.length; i++)
          this.removePhoto(0);
        this.lot = {
          Name: "",
          Description: "",
          Category: "",
          StartDate: null,
          SellDate: null,
          Price: 0,
          Currency: "",
          MinStep: 0,
          LotPhotos: [],
          BidPlacer: "Determined"
        };
      }
    );
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
    this.lot.LotPhotos[i] = lotPhoto;
  }
}

