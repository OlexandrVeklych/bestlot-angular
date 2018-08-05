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
  onShowClick() {
    this.show = true;
  }

  @Input()
  set lot(lot: LotModel) {
    if (!lot)
      return;
    this.commentPage = 1;
    this._lot = lot;
    this.lotPhotoService.getLotPhotos(this._lot.Id).subscribe(response => {
      this._lot.LotPhotos = response;
    });

    this.lotCommentService.getLotComments(this._lot.Id, this.commentPage, this.commentAmount).subscribe(response => {
      if (response.length < 10)
        this.commentPage = -1;
      this._lot.LotComments = response;
    });
    this.commentPage++;
    this.userService.getSellerUser(this._lot.Id).subscribe(response => {
      this._lot.SellerUser = response;
    });
    this.userService.getBuyerUser(this._lot.Id).subscribe(response => {
      if (response)
        this._lot.BuyerUser = response;
    });
    this.show = false;
  }
  _lot: LotModel = null;

  ngOnInit() {

  }

  loadComments() {
    this.lotCommentService.getLotComments(this._lot.Id, this.commentPage, this.commentAmount).subscribe(response => {
      if (response.length < 10)
        this.commentPage = -1;
      else
        this._lot.LotComments.push(...response);
    });
  }

  addComment() {
    if (!this.comment.Rating || !this.comment.Rating)
      alert("Enter mark and comment");
    this.lotCommentService.addComment(this._lot.Id, this.comment).subscribe();
  }
}
