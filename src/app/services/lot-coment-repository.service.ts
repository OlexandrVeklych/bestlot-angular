import { HttpClient } from "@angular/common/http";
import { LotCommentModel } from "../models/lot-comment-model";
import { Observable } from "rxjs";
import { AccountManagementService } from "./account-management.service";
import { Injectable } from '@angular/core';
import { LotCommentRequestModel } from "../models/lot-comment-request-model";

@Injectable({
    providedIn: 'root',
})
export class LotCommentRepositoryService {
    readonly baseUrl = '/api/'

    constructor(private http: HttpClient, private accountManager: AccountManagementService) { }

    addComment(lotId: number, comment: LotCommentRequestModel): Observable<LotCommentModel> {
        const currentUrl = `${this.baseUrl}lots/${lotId}/comments`;
        return this.http.post<LotCommentModel>(currentUrl, comment, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")
            }
        });
    }

    getLotComments(lotId: number, page: number, amount: number): Observable<LotCommentModel[]> {
        const currentUrl = `${this.baseUrl}lots/${lotId}/comments/?page=${page}&amount=${amount}`;
        return this.http.get<LotCommentModel[]>(currentUrl, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")
            }
        });
    }

    getUserLotComments(email: string, page: number, amount: number): Observable<LotCommentModel[]> {
        const currentUrl = `${this.baseUrl}users/${email}/comments/?page=${page}&amount=${amount}`;
        return this.http.get<LotCommentModel[]>(currentUrl,
            {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")
                }
            });
    }

    getLotCommentByNumber(lotId: number, commentNumber: number): Observable<LotCommentModel> {
        const currentUrl = `${this.baseUrl}lots/${lotId}/comments/${commentNumber}`;
        return this.http.get<LotCommentModel>(currentUrl);
    }
}