import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { TimeZone } from './timezone';

import * as apis from '../private/external.apis.json';

@Injectable({
  providedIn: 'root'
})
export class TimeZoneService {
	
  private baseUrl = apis['googleAPIs']['urls']['timezone'];

  private apiKey = apis['googleAPIs']['key'];

  constructor(private http : HttpClient) {}
  
  getTimeZone(latitude: number, longitude: number, timestamp: number) : Observable<TimeZone> {
    const url = `${this.baseUrl}?location=${latitude},${longitude}&timestamp=${timestamp}&key=${this.apiKey}`;
    return this.http.get<TimeZone>(url);
  }
}
