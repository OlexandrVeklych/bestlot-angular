import { LotPhotoModel } from "./lot-photo-model";
import { LotCommentModel } from "./lot-comment-model";
import { UserAccountInfoModel } from "./user-account-info-model";

export interface LotModel {
  Id: number;
  Name: string;
  Description: string;
  Category: string;
  SellerUserId: string;
  SellerUser: UserAccountInfoModel;
  BuyerUserId: string;
  BuyerUser: UserAccountInfoModel;
  Price: number;
  Currency: string;
  MinStep: number;
  StartDate: Date;
  SellDate: Date;
  LotPhotos: LotPhotoModel[];
  LotComments: LotCommentModel[];
  BidPlacer: string;
}