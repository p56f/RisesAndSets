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
  
  private timeZoneOffset = '+0000'

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
      .subscribe( tz => {
        this.timeZone = tz;
        this.currentDateTime = new Date();
        this.timeZoneOffset = this.getTimeZoneOffset();
      });
  }

  private getCurrentTimestamp() : number {
    return Math.round(this.currentDateTime.getTime() / 1000);
  }

  private getTimeZoneOffset() : string {
    let offsetInMinutes = (this.timeZone.rawOffset + this.timeZone.dstOffset) / 60;
    let hoursPart = Math.floor(offsetInMinutes / 60);
    let hoursPartString = `${Math.abs(hoursPart)}`.padStart(2, '0');
    let minutesPartString = `${offsetInMinutes % 60}`.padStart(2, '0');

    return `${(hoursPart >= 0) ? '+' : '-'}${hoursPartString}${minutesPartString}`;
  }

}
