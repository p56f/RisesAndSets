import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import * as apis from '../private/external.apis.json';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {
	
  private baseUrl = apis['googleAPIs']['urls']['geocoding'];

  private apiKey = apis['googleAPIs']['key'];

  constructor(private http : HttpClient) {}
  
  getLocation(address: string) : Observable<any> {
    const url = `${this.baseUrl}?address=${address}&key=${this.apiKey}`;
    return this.http.get(url);
  }

  getFormattedAddress(latitude: number, longitude: number) {
    const url = `${this.baseUrl}?latlng=${latitude},${longitude}&key=${this.apiKey}`;
    return this.http.get(url);
  }
}
