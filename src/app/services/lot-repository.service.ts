import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { LotModel } from "../models/lot-model";
import { AccountManagementService } from './account-management.service';

export class LotRepositoryService{
    readonly baseUrl = 'http://localhost:63959/api/'

    constructor(private http: HttpClient, private accountManager: AccountManagementService) {}

    getLots(page: number, amount: number, name: string = null, category: string = null, minPrice: number = 0, maxPrice: number = 0): Observable<LotModel[]>  {
        const currentUrl = `${this.baseUrl}lots/?page=${page}&amount=${amount}&name=${name}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
        return this.http.get<LotModel[]>(currentUrl);
    }

    getUserLots(email: string, page: number, amount: number, name: string = null, category: string = null, minPrice: number = 0, maxPrice: number = 0): Observable<LotModel[]>  {
        const currentUrl = `${this.baseUrl}users/${email}/lots/?page=${page}&amount=${amount}&name=${name}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
        return this.http.get<LotModel[]>(currentUrl);
    }

    getLot(id: number): Observable<LotModel>{
        const currentUrl = `${this.baseUrl}lots/${id}`;
        return this.http.get<LotModel>(currentUrl);
    }

    postLot(lot: LotModel): Observable<LotModel>{
        const currentUrl = `${this.baseUrl}lots`;
        return this.http.post<LotModel>(currentUrl, lot, {
            headers: this.accountManager.getHeaders()
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