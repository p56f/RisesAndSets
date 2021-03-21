import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import * as apis from '../private/apis.json';

@Injectable({
  providedIn: 'root'
})
export class SunService {

  private baseUrl = apis['internalAPIs']['urls']['sun'];

  constructor(private http : HttpClient) {}
  
  getSunInfo(latitude: number, longitude: number, date: Date, timeOffset: number) : Observable<any> {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const url = `${this.baseUrl}?latitude=${latitude}&longitude=${longitude}` + 
            `&day=${day}&month=${month}&year=${year}&timeOffset=${timeOffset}`;
    return this.http.get(url);
  }
}
