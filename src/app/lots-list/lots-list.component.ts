import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  constructor(private lotService: LotRepositoryService, private lotPhotoService: LotPhotoRepositoryService) { }

  page = 1;
  amount = 10;
  shouldLoadAll: boolean = true;
  _lots: LotModel[] = [];
  selectedLot: LotModel;

  @Input() set lots(lots: LotModel[]) {
    this._lots = lots;
    this.selectedLot = null;
    if (this.shouldLoadAll)
      this.shouldLoadAll = false;
  }

  @Output() shouldLoad = new EventEmitter<{ page: number, amount: number }>();
  
  ngOnInit() {
  }

  onLoadLotsClick() {
    this.selectedLot = null;
    if (this.shouldLoadAll)
      this.lotService.getLots(this.page, this.amount).subscribe(response => {
        this._lots = response;
      },
        () => { },//onError
        () => { //onComplete => load photo
          this._lots.forEach(lot => {
            this.lotPhotoService.getLotPhotoByNumber(lot.Id, 0).subscribe(response => {
              lot.LotPhotos = [response];
            })
          });
        });
    else
      this.shouldLoad.emit({ page: this.page, amount: this.amount });
  }

  onSelect(lot: LotModel) {
    this.selectedLot = lot;
  }
}
