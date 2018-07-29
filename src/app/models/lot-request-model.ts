export interface LotRequestModel {
    Name: string;
    Description: string;
    Category: string;
    Price: number;
    MinStep: number;
    SellDate: Date;
    Photo: FormData;
  }