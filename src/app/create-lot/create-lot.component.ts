import { Component, OnInit } from '@angular/core';
import { LotRequestModel } from '../models/lot-request-model';
import { LotRepositoryService } from '../services/lot-repository.service';

@Component({
  selector: 'app-create-lot',
  templateUrl: './create-lot.component.html',
  styleUrls: ['./create-lot.component.css']
})
export class CreateLotComponent implements OnInit {

  constructor(private service: LotRepositoryService) { }

  photosCount = 1;
  
  getPhotosCount(){
    return new Array(this.photosCount);
  }

  lot: LotRequestModel = {
    Name: "",
    Description: "",
    Category: "",
    SellDate: null,
    MinStep: 0,
    Price: 0,
    LotPhotos: [{
      Path: "",
      Description: ""
    }]
  };

  ngOnInit() {
  }

  submit(){
    this.lot.LotPhotos.pop();
    this.photosCount--;
    this.lot.LotPhotos.forEach(lotPhoto => {
      lotPhoto.Path = lotPhoto.Path.replace("data:image/jpeg;base64,","")
    });
    this.service.postLot(this.lot).subscribe();
    alert('request sent');
  }

  removePhoto(position: number){
    for(var i = position; i < this.lot.LotPhotos.length; i++){
      this.lot.LotPhotos[i] = this.lot.LotPhotos[i + 1];
    }
    this.lot.LotPhotos.pop;
    this.photosCount--;
  }

  onFileChanged(event, j){
    console.log(event);
    this.photosCount = j + 2;
    var myReader:FileReader = new FileReader();

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

