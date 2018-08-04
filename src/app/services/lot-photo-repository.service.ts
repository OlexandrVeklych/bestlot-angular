import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { LotPhotoRequestModel } from "../models/lot-photo-request-model";
import { LotPhotoModel } from "../models/lot-photo-model";

@Injectable({
    providedIn: 'root',
})
export class LotPhotoRepositoryService {
    readonly baseUrl = '/api/'

    constructor(private http: HttpClient) { }

    addPhotos(lotId: number, photos: LotPhotoRequestModel[]): Observable<LotPhotoModel> {
        const currentUrl = `${this.baseUrl}lots/${lotId}/photos`;
        return this.http.post<LotPhotoModel>(currentUrl, photos, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")
            }
        });
    }

    getLotPhotos(lotId: number): Observable<LotPhotoModel[]> {
        const currentUrl = `${this.baseUrl}lots/${lotId}/photos`;
        return this.http.get<LotPhotoModel[]>(currentUrl, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("tokenKey")
            }
        });
    }

    getLotPhotoByNumber(lotId: number, photoNumber: number): Observable<LotPhotoModel> {
        const currentUrl = `${this.baseUrl}lots/${lotId}/photos/${photoNumber}`;
        return this.http.get<LotPhotoModel>(currentUrl);
    }
}