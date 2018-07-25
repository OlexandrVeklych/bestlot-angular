import { HttpClient } from "@angular/common/http";
import { UserAccountInfoModel } from "../models/user-account-info-model";
import { Observable } from "rxjs";
import { AccountManagementService } from "./account-management.service";

export class UserRepositoryService{
    readonly baseUrl = 'http://localhost:63959/api/'

    constructor(private http: HttpClient, private accountManager: AccountManagementService) {}

    getUsers(page: number, amount: number): Observable<UserAccountInfoModel[]>  {
        const currentUrl = `${this.baseUrl}users/?page=${page}&amount=${amount}`;
        return this.http.get<UserAccountInfoModel[]>(currentUrl, {
            headers: this.accountManager.getHeaders()
        });
    }

    getUser(email: string): Observable<UserAccountInfoModel>  {
        const currentUrl = `${this.baseUrl}users/${email}`;
        return this.http.get<UserAccountInfoModel>(currentUrl);
    }

    getSellerUser(lotId: number): Observable<UserAccountInfoModel> {
        const currentUrl = `${this.baseUrl}lots/${lotId}/selleruser`;
        return this.http.get<UserAccountInfoModel>(currentUrl);
    }

    getBuyerUser(lotId: number): Observable<UserAccountInfoModel> {
        const currentUrl = `${this.baseUrl}lots/${lotId}/buyeruser`;
        return this.http.get<UserAccountInfoModel>(currentUrl);
    }

    putUser(email: string, user: UserAccountInfoModel) : Observable<UserAccountInfoModel> {
        const currentUrl = `${this.baseUrl}users/${email}`;
        return this.http.put<UserAccountInfoModel>(currentUrl, user, {
            headers: this.accountManager.getHeaders()
        });
    }
}