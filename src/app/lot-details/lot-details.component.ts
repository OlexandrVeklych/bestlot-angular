import { Component, OnInit, Input } from '@angular/core';
import { LotModel } from '../models/lot-model';
import { LotCommentRepositoryService } from '../services/lot-coment-repository.service';
import { LotCommentRequestModel } from '../models/lot-comment-request-model';
import { LotPhotoRepositoryService } from '../services/lot-photo-repository.service';
import { UserRepositoryService } from '../services/user-repository.service';

@Component({
  selector: 'app-lot-details',
  templateUrl: './lot-details.component.html',
  styleUrls: ['./lot-details.component.css']
})
export class LotDetailsComponent implements OnInit {

  constructor(private lotCommentService: LotCommentRepositoryService, private lotPhotoService: LotPhotoRepositoryService, private userService: UserRepositoryService) { }

  commentPage: number = 1;
  commentAmount: number = 10;

  comment: LotCommentRequestModel = {
    Message: null,
    Rating: null,
  }

  show: boolean = false;
  onShowClick(){
    this.lotPhotoService.getLotPhotos(this.lot.Id).subscribe(response => {
      this.lot.LotPhotos = response;
    });

    this.lotCommentService.getLotComments(this.lot.Id, this.commentPage, this.commentAmount).subscribe(response => {
      this.lot.LotComments = response;
    });
    this.commentPage++;
    this.userService.getSellerUser(this.lot.Id).subscribe(response => {
      this.lot.SellerUser = response;
    });
    this.userService.getBuyerUser(this.lot.Id).subscribe(response => {
      if (response)
        this.lot.BuyerUser = response;
    });
    this.show = true;
  }

  @Input() lot: LotModel = {
    Id: 0,
    Name: null,
    Description: null,
    Category: null,
    SellerUserId: null,
    SellerUser: null,
    BuyerUserId: null,
    BuyerUser: null,
    Price: 0,
    MinStep: 0,
    StartDate: null,
    SellDate: null,
    LotPhotos: null,
    LotComments: null
  }

  ngOnInit() {
    
  }

  loadComments() {
    this.lotCommentService.getLotComments(this.lot.Id, this.commentPage, this.commentAmount).subscribe(response => {
      if (response.length < 10)
        this.commentPage = -1;
      else
        this.lot.LotComments.push(...response);
    });
  }

  addComment() {
    if (!this.comment.Rating || !this.comment.Rating)
      alert("Enter mark and comment");
    this.lotCommentService.addComment(this.lot.Id, this.comment).subscribe();
  }
}
