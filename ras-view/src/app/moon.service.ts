import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import * as apis from '../private/external.apis.json';

@Injectable({
  providedIn: 'root'
})
export class MoonService {

  private baseUrl = apis['internalAPIs']['urls']['moon'];

  constructor(private http : HttpClient) {}
  
  getMoonInfo(date: Date, timeZoneId: string) : Observable<any> {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const url = `${this.baseUrl}?day=${day}&month=${month}&year=${year}` + 
            `&hour=${hour}&minute=${minute}&second=${second}&timeZoneId=${timeZoneId}`;
    return this.http.get(url);
  }
}
