import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { LotModel } from "../models/lot-model";
import { AccountManagementService } from './account-management.service';
import { Injectable } from '@angular/core';
import { LotRequestModel } from '../models/lot-request-model';

@Injectable({
  providedIn: 'root',
})
export class LotRepositoryService{
    readonly baseUrl = '/api/'

    constructor(private http: HttpClient, private accountManager: AccountManagementService) {}

    getLots(page: number, amount: number, name: string = null, category: string = null, minPrice: number = 0, maxPrice: number = 0): Observable<LotModel[]>  {
        const currentUrl = `${this.baseUrl}lots/?page=${page}&amount=${amount}&name=${name}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
        return this.http.get<LotModel[]>(currentUrl);
    }

    getUserLots(email: string, page: number, amount: number, name: string = null, category: string = null, minPrice: number = 0, maxPrice: number = 0): Observable<LotModel[]>  {
        const currentUrl = `${this.baseUrl}users/${email}/lots/?page=${page}`;//&amount=${amount}&name=${name}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
        return this.http.get<LotModel[]>(currentUrl);
    }

    getLot(id: number): Observable<LotModel>{
        const currentUrl = `${this.baseUrl}lots/${id}`;
        return this.http.get<LotModel>(currentUrl);
    }

    postLot(lot: LotRequestModel): Observable<LotRequestModel>{
        const currentUrl = `${this.baseUrl}lots`;
        return this.http.post<LotRequestModel>(currentUrl, lot, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")
            }
        });
    }

    putLot(id: number, lot: LotModel): Observable<LotModel>{
        const currentUrl = `${this.baseUrl}lots/${id}`;
        return this.http.put<LotModel>(currentUrl, lot, {
            headers: this.accountManager.getHeaders()
        });
    }

    deleteLot(id: number): Observable<LotModel>{
        const currentUrl = `${this.baseUrl}lots/${id}`;
        return this.http.delete<LotModel>(currentUrl, {
            headers: this.accountManager.getHeaders()
        });
    }
}