import { Component, OnInit } from '@angular/core';
import { LotRepositoryService } from '../services/lot-repository.service';
import { LotModel } from '../models/lot-model';
import { LotPhotoRepositoryService } from '../services/lot-photo-repository.service';

@Component({
  selector: 'app-lot-search',
  templateUrl: './lot-search.component.html',
  styleUrls: ['./lot-search.component.css']
})
export class LotSearchComponent implements OnInit {

  constructor(private lotService: LotRepositoryService, private lotPhotoService: LotPhotoRepositoryService) { }

  name: string = null;
  category: string = null;
  minPrice: number = 0;
  maxPrice: number = 0;

  searchResult: LotModel[] = [];

  ngOnInit() {
  }

  loadLots(event) {
    if (!event)
      event = { page: 1, amount: 10 }
    this.lotService.getLots(event.page, event.amount, this.name, this.category, this.minPrice, this.maxPrice).subscribe(
      result => { this.searchResult = result },
      () => { alert("Error") },
      () => {
        this.searchResult.forEach(lot => {
          this.lotPhotoService.getLotPhotoByNumber(lot.Id, 0).subscribe(response => {
            lot.LotPhotos = [response];
          })
        });
      }
    );
  }
}
