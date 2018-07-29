import { Component, OnInit } from '@angular/core';
import { LotRepositoryService } from '../services/lot-repository.service';
import { LotModel } from '../models/lot-model';

@Component({
  selector: 'app-lots-list',
  templateUrl: './lots-list.component.html',
  styleUrls: ['./lots-list.component.css']
})
export class LotsListComponent implements OnInit {

  constructor(private service: LotRepositoryService) { }

  page = 1;
  lots: LotModel[] = [
    {
       Id: 1,
       Name: "",
      Description: "",
      Category: "",
      StartDate: "",
      SellDate: "",
      SellerUser: null,
      SellerUserId: "",
      BuyerUserId: "",
      MinStep: 0,
      Price: 0,
      LotPhotos: null,
      LotComments: null
    }
  ];

  selectedLot: LotModel;

  isLoading = false;

  onLoadClick() {
    this.lots.length = 0;
    this.selectedLot = null;
    this.isLoading = true;
    this.service.getLots(this.page, 10).subscribe(p => {
      this.isLoading = false;
      this.lots.push(...p);
      this.page++;
    });
  }

  onSelect(lot: LotModel){
    this.selectedLot = lot;
  }

  ngOnInit() {
  }

}
