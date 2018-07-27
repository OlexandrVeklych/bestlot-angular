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

  lot: LotRequestModel = {
    Name: "",
    Description: "",
    SellDate: "",
    MinStep: 0,
    Price: 0
  };

  ngOnInit() {
  }

  submit(){
    this.service.postLot(this.lot).subscribe();
    alert('request sent');
  }
}
