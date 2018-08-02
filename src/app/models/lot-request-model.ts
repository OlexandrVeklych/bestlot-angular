import { LotPhotoRequestModel } from "./lot-photo-request-model";

export interface LotRequestModel {
    Name: string;
    Description: string;
    Category: string;
    Price: number;
    MinStep: number;
    SellDate: Date;
    LotPhotos: LotPhotoRequestModel[];
  }