import { Component, OnInit, Input } from '@angular/core';
import { LotModel } from '../models/lot-model';
import { LotCommentRepositoryService } from '../services/lot-coment-repository.service';
import { LotCommentRequestModel } from '../models/lot-comment-request-model';
import { LotPhotoRepositoryService } from '../services/lot-photo-repository.service';
import { UserRepositoryService } from '../services/user-repository.service';
import { LotRepositoryService } from '../services/lot-repository.service';

@Component({
  selector: 'app-lot-details',
  templateUrl: './lot-details.component.html',
  styleUrls: ['./lot-details.component.css']
})
export class LotDetailsComponent implements OnInit {

  constructor(private lotCommentService: LotCommentRepositoryService,
    private lotPhotoService: LotPhotoRepositoryService,
    private userService: UserRepositoryService,
    private lotService: LotRepositoryService) { }

  commentPage: number = 1;
  commentAmount: number = 10;
  show: boolean = false;
  _lot: LotModel = null;
  bid: number = 0;
  intervalId;
  comment: LotCommentRequestModel = {
    Message: null,
    Rating: null,
  }

  @Input()
  set lot(lot: LotModel) {
    this._lot = lot;
    this.show = false;
    if (!lot)
      return;
    this.commentPage = 1;
    this.bid = this._lot.Price + this._lot.MinStep;
    this.loadLot();
  }

  ngOnInit() {
  }

  
  startRefreshing() {
    this.intervalId = setInterval(() => this.refreshBid(), 5000);
  }

  stopRefreshing() {
    clearInterval(this.intervalId);
  }

  refreshBid() {
    if (this._lot) {
      this.lotService.getBid(this._lot.Id).subscribe(
        (response) => {
          this._lot.Price = response.Price;
          this._lot.SellDate = response.SellDate;
          this._lot.BuyerUser = response.BuyerUser;
          this._lot.BuyerUserId = response.BuyerUser.Email;
        },
        () => { alert("Error refreshing price") },
        () => { }
      );
      this.bid = this._lot.Price + this._lot.MinStep;
    }
  }

  onShowClick() {
    this.show = true;
  }

  loadLot() {
    this.lotPhotoService.getLotPhotos(this._lot.Id).subscribe(response => {
      this._lot.LotPhotos = response;
    });
    this.lotCommentService.getLotComments(this._lot.Id, this.commentPage, this.commentAmount).subscribe(response => {
      this._lot.LotComments = response;
    });
    this.userService.getSellerUser(this._lot.Id).subscribe(response => {
      this._lot.SellerUser = response;
    });
    this.userService.getBuyerUser(this._lot.Id).subscribe(response => {
      if (response)
        this._lot.BuyerUser = response;
    });
  }

  confirmBid() {
    if (this._lot.SellDate < new Date()) {
      alert("Sorry, lot is sold")
      return;
    }
    if (this._lot.Price + this._lot.MinStep > this.bid) {
      alert("Minimum availible bid is " + (this._lot.Price + this._lot.MinStep));
      return;
    }
    if (confirm("Place bid of " + this.bid + " for " + this._lot.Name + "?"))
      this.lotService.postBid(this._lot.Id, this.bid).subscribe(
        () => { },
        () => { alert("Error") },
        () => { alert("Success") }
      );
  }

  loadComments() {
    this.lotCommentService.getLotComments(this._lot.Id, this.commentPage, this.commentAmount).subscribe(response => {
      this._lot.LotComments = response;
    });
  }

  addComment() {
    if (!this.comment.Rating || !this.comment.Rating)
      alert("Enter mark and comment");
    else
      this.lotCommentService.addComment(this._lot.Id, this.comment).subscribe();
  }
}
