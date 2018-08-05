import { Component, OnInit } from '@angular/core';
import { LotRepositoryService } from '../services/lot-repository.service';
import { LotModel } from '../models/lot-model';
import { DomSanitizer } from '@angular/platform-browser';
import { LotPhotoRepositoryService } from '../services/lot-photo-repository.service';


@Component({
  selector: 'app-lots-list',
  templateUrl: './lots-list.component.html',
  styleUrls: ['./lots-list.component.css']
})
export class LotsListComponent implements OnInit {

  constructor(private lotService: LotRepositoryService, private lotPhotoService: LotPhotoRepositoryService, private DomSanitizerService: DomSanitizer) { }

  page = 1;
  lots: LotModel[] = [];

  selectedLot: LotModel;

  isLoading = false;

  onLoadLotsClick() {
    this.selectedLot = null;
    this.isLoading = true;
    this.lotService.getLots(this.page, 10).subscribe(p => {
      this.isLoading = false;
      this.lots = p;
      this.page++;
    },
      () => { },//onError
      () => { //onComplete => load photo
        this.lots.forEach(lot => {
          this.lotPhotoService.getLotPhotoByNumber(lot.Id, 0).subscribe(response => {
            lot.LotPhotos = [response];
          })
        });
      });
  }

  getPhoto(lotNumber: number, photoNumber: number) {
    return this.DomSanitizerService.bypassSecurityTrustUrl(this.lots[lotNumber].LotPhotos[photoNumber].Path);
  }

  onSelect(lot: LotModel) {
    this.selectedLot = lot;
  }

  ngOnInit() {
    this.DomSanitizerService.bypassSecurityTrustUrl
  }

}
