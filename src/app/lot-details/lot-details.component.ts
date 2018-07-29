import { Component, OnInit, Input } from '@angular/core';
import { LotModel } from '../models/lot-model';
import { LotCommentRepositoryService } from '../services/lot-coment-repository.service';
import { LotCommentRequestModel } from '../models/lot-comment-request-model';

@Component({
  selector: 'app-lot-details',
  templateUrl: './lot-details.component.html',
  styleUrls: ['./lot-details.component.css']
})
export class LotDetailsComponent implements OnInit {

  constructor(private service: LotCommentRepositoryService) { }

  comment: LotCommentRequestModel = {
    Message: null,
    Rating: null,
  }


  @Input() lot: LotModel = {
    Id: 0,
    Name: null,
    Description: null,
    Category: null,
    SellerUserId: null,
    SellerUser: null,
    BuyerUserId: null,
    Price: 0,
    MinStep: 0,
    StartDate: null,
    SellDate: null,
    LotPhotos: null,
    LotComments: null
  }

  ngOnInit() {
  }

  addComment(){
    if (!this.comment.Rating || ! this.comment.Rating)
      alert("Enter mark and comment");
    this.service.addComment(this.lot.Id, this.comment).subscribe();
  }
}
