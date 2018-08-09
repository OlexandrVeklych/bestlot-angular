import { Component, OnInit } from '@angular/core';
import { LotRequestModel } from '../models/lot-request-model';
import { LotRepositoryService } from '../services/lot-repository.service';

@Component({
  selector: 'app-create-lot',
  templateUrl: './create-lot.component.html',
  styleUrls: ['./create-lot.component.css']
})
export class CreateLotComponent implements OnInit {

  constructor(private lotService: LotRepositoryService) { }

  determinedSelldate: boolean = true;
  days: number = 0;
  hours: number = 1;
  minutes: number = 0;
  seconds: number = 0;
  photosCount = 1;
  lot: LotRequestModel = {
    Name: "",
    Description: "",
    Category: "",
    StartDate: null,
    SellDate: null,
    MinStep: 0,
    Price: 0,
    LotPhotos: [{
      Path: "",
      Description: ""
    }],
    BidPlacer: 1
  };

  ngOnInit() {
  }

  getPhotosCount() {
    return new Array(this.photosCount);
  }

  addLot() {
    this.lot.LotPhotos.pop();
    this.photosCount--;
    this.lot.LotPhotos.forEach(lotPhoto => {
      lotPhoto.Path = lotPhoto.Path.replace("data:image/jpeg;base64,", "")
    });
    if (!this.determinedSelldate) {
      this.lot.BidPlacer = 2;
      var now = new Date();
      this.lot.StartDate = now;
      this.lot.SellDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + this.days,
        now.getHours() + this.hours,
        now.getMinutes() + this.minutes,
        now.getSeconds() + this.seconds
      )
    }
    this.lotService.postLot(this.lot).subscribe(
      () => { },
      () => {
        alert("Error");
        this.lot.LotPhotos.forEach(lotPhoto => {
          lotPhoto.Path = lotPhoto.Path = "data:image/jpeg;base64," + lotPhoto.Path;
        });
      },
      () => {
        alert("Success");
        this.lot.LotPhotos.forEach(lotPhoto => {
          lotPhoto.Path = lotPhoto.Path = "data:image/jpeg;base64," + lotPhoto.Path;
        });
      }
    );
    alert('request sent');
  }

  removePhoto(position: number) {
    for (var i = position; i < this.lot.LotPhotos.length; i++) {
      this.lot.LotPhotos[i] = this.lot.LotPhotos[i + 1];
    }
    this.lot.LotPhotos.pop;
    this.photosCount--;
  }

  onFileChanged(event, j) {
    console.log(event);
    this.photosCount = j + 2;
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.lot.LotPhotos[j].Path = myReader.result.toString();
    }
    this.lot.LotPhotos.push({
      Path: "",
      Description: ""
    });
    myReader.readAsDataURL(event.target.files[0]);
    console.log(this.lot.LotPhotos[j]);
  }
}

