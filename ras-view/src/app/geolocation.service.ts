import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {
	
  private baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

  private apiKey = 'AIzaSyDiokY2HUj9xPhUh2NnfUUEAGG9qKxuLvk';

  constructor(private http : HttpClient) {}
  
  getLocation(address: string) : Observable<any> {
    const url = `${this.baseUrl}?address=${address}&key=${this.apiKey}`;
    return this.http.get(url);
  }
}
