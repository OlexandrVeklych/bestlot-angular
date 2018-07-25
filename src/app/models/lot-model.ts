import { LotPhotoModel } from "./lot-photo-model";
import { LotCommentModel } from "./lot-comment-model";
import { UserAccountInfoModel } from "./user-account-info-model";

export interface LotModel {
  Id: number;
  Name: string;
  Description: string;
  SellerUserId: string;
  SellerUser: UserAccountInfoModel;
  BuyerUserId: string;
  Price: number;
  MinStep: number;
  StartDate: string;
  SellDate: string;
  LotPhotos: LotPhotoModel[];
  LotComments: LotCommentModel[]
}