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

  constructor(private lotService: LotRepositoryService, private lotPhotoService: LotPhotoRepositoryService, private DomSanitizerService: DomSanitizer) { }

  page = 1;

  shouldLoadAll: boolean = true;

  @Input() set lots(lots: LotModel[]) {
    this._lots = lots;
    if (this.shouldLoadAll)
      this.shouldLoadAll = false;
  }

  @Output() shouldLoad = new EventEmitter<{ page: number, amount: number }>();


  _lots: LotModel[] = [];

  selectedLot: LotModel;

  isLoading = false;

  onLoadLotsClick() {
    this.selectedLot = null;
    this.isLoading = true;
    if (this.shouldLoadAll)
      this.lotService.getLots(this.page, 10).subscribe(p => {
        this.isLoading = false;
        this._lots = p;
        this.page++;
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
      this.shouldLoad.emit({ page: this.page, amount: 10 });
  }

  getPhoto(lotNumber: number, photoNumber: number) {
    return this.DomSanitizerService.bypassSecurityTrustUrl(this._lots[lotNumber].LotPhotos[photoNumber].Path);
  }

  onSelect(lot: LotModel) {
    this.selectedLot = lot;
  }

  ngOnInit() {
    this.DomSanitizerService.bypassSecurityTrustUrl
  }

}
