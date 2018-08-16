import { LotPhotoRequestModel } from "./lot-photo-request-model";

export interface LotRequestModel {
  Name: string;
  Description: string;
  Category: string;
  Price: number;
  Currency: string;
  MinStep: number;
  StartDate: Date;
  SellDate: Date;
  LotPhotos: LotPhotoRequestModel[];
  BidPlacer: string;
}