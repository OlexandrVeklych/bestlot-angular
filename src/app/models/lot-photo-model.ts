import { LotModel } from "./lot-model";

export interface LotPhotoModel{
    Id: number;
    Photo: string;
    Description: string;
    LotId: number;
    Lot: LotModel;
}