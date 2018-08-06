import { LotModel } from "./lot-model";
import { LotCommentModel } from "./lot-comment-model";

export interface UserAccountInfoModel {
    Email: string;
    Name: string;
    Surname: string;
    TelephoneNumber: string;
    Lots: LotModel[];
    LotComments: LotCommentModel[];
}