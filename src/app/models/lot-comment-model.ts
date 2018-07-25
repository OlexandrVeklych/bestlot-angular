import { LotModel } from "./lot-model";
import { UserAccountInfoModel } from "./user-account-info-model";

export interface LotCommentModel{
    Id: number;
    Message: string;
    UserId: string;
    User: UserAccountInfoModel;
    Rating: number;
    LotId: number;
    Lot: LotModel;
}