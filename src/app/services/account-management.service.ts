import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserRegistrationModel } from "../models/user-registration-model";
import { UserAccountInfoModel } from "../models/user-account-info-model";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountManagementService{
    readonly baseUrl = 'http://localhost:63959/api/'

    constructor(private http: HttpClient) {}

    getHeaders(){
        var headers = new HttpHeaders();
        headers.append('Authorization', 'Bearer ' + sessionStorage.getItem("tokenKey"));
        return headers;
    }

    register(user: UserRegistrationModel) : Observable<UserAccountInfoModel>{
        const currentUrl = `${this.baseUrl}account/register`;
        return this.http.post<UserAccountInfoModel>(currentUrl, user);
    }

    login(email: string, password: string){
        var loginData = {
            grant_type: "password",
            username: email,
            password: password,
        }
        const currentUrl = `http://localhost:63959/token`;

        this.http.post<any>(currentUrl, loginData).subscribe(response => {
            sessionStorage.setItem("tokenKey", response.access_token)
        })
    }

    logout(){
        const currentUrl = `${this.baseUrl}account/logout`;
        this.http.post<any>(currentUrl, null);
    }
}