import { Component, OnInit } from '@angular/core';

import { GeoLocation } from '../geolocation';
import { GeoLocationService } from '../geolocation.service';

import { TimeZone } from '../timezone';
import { TimeZoneService } from '../timezone.service';

@Component({
  selector: 'app-geoInfo',
  templateUrl: './geoinfo.component.html',
  styleUrls: ['./geoinfo.component.css']
})
export class GeoInfoComponent implements OnInit {
  
  private address = '';
  
  private geoLocation : GeoLocation;

  private timeZone : TimeZone;

  private currentDateTime = new Date();

  private currentDateTimeOffset = this.getOffset();

  constructor(
    private geoLocationService : GeoLocationService,
    private timeZoneService: TimeZoneService) { }

  ngOnInit() {
  }

  getLocationWithTimeZone() {
    this.geoLocationService.getLocation(this.address).subscribe( data => 
      {
        let result = data['results'][0];
        let location = result['geometry']['location'];
        this.geoLocation = {
          formattedAddress : result['formatted_address'],
          latitude: location['lat'],
          longitude: location['lng']
        };
        this.getTimeZone();
      }
    );
  }

  private getTimeZone() {
    this.timeZoneService
      .getTimeZone(this.geoLocation.latitude, this.geoLocation.longitude, this.getCurrentTimestamp())
      .subscribe( tz => this.timeZone = tz);
  }

  private getCurrentTimestamp() : number {
    return Math.round(this.currentDateTime.getTime() / 1000);
  }

  private getOffset() : number {
    return this.currentDateTime.getTimezoneOffset();
  }
}
