import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserRegistrationModel } from "../models/user-registration-model";
import { UserAccountInfoModel } from "../models/user-account-info-model";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountManagementService{
    readonly baseUrl = '/api/'

    constructor(private http: HttpClient) {}

    register(user: UserRegistrationModel){
        const currentUrl = `${this.baseUrl}account/register`;
        this.http.post(currentUrl, user).subscribe();
    }

    login(email: string, password: string){
        var loginData = `grant_type=password&username=${email}&password=${password}`

        const currentUrl = `${this.baseUrl}token`;

        this.http.post<any>(currentUrl, loginData).subscribe(response => {
            sessionStorage.setItem("tokenKey", response.access_token)
        })
    }

    logout(){
        const currentUrl = `${this.baseUrl}account/logout`;
        this.http.post<any>(currentUrl, null, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")
            }
        });
        sessionStorage.removeItem("tokenKey");
    }
}