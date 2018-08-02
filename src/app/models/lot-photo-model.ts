import { LotModel } from "./lot-model";

export interface LotPhotoModel{
    Id: number;
    Path: string;
    Description: string;
    LotId: number;
    Lot: LotModel;
}