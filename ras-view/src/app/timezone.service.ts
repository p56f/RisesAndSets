import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { TimeZone } from './timezone';

@Injectable({
  providedIn: 'root'
})
export class TimeZoneService {
	
  private baseUrl = 'https://maps.googleapis.com/maps/api/timezone/json';

  private apiKey = 'AIzaSyDiokY2HUj9xPhUh2NnfUUEAGG9qKxuLvk';

  constructor(private http : HttpClient) {}
  
  getTimeZone(latitude: number, longitude: number, timestamp: number) : Observable<TimeZone> {
    const url = `${this.baseUrl}?location=${latitude},${longitude}&timestamp=${timestamp}&key=${this.apiKey}`;
    return this.http.get<TimeZone>(url);
  }
}
