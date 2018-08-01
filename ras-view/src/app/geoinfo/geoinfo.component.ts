import { Component, OnInit } from '@angular/core';

import { GeoLocation } from '../geolocation';
import { GeoLocationService } from '../geolocation.service';

import { TimeZone } from '../timezone';
import { TimeZoneService } from '../timezone.service';

import { SunInfo } from '../suninfo';
import { SunService } from '../sun.service';

@Component({
  selector: 'app-geoInfo',
  templateUrl: './geoinfo.component.html',
  styleUrls: ['./geoinfo.component.css']
})
export class GeoInfoComponent implements OnInit {
  
  private address = '';
  
  private geoLocation : GeoLocation;

  private timeZone : TimeZone;

  private sunInfo : SunInfo;

  private currentDateTime = new Date();
  
  private timeZoneOffset = '+0000'

  constructor(
    private geoLocationService : GeoLocationService,
    private timeZoneService: TimeZoneService,
    private sunService: SunService) { }

  ngOnInit() {
  }

  getLocationWithTimeZone() {
    this.geoLocationService.getLocation(this.address).subscribe( data => 
      {
        const result = data['results'][0];
        const location = result['geometry']['location'];
        this.geoLocation = {
          formattedAddress: result['formatted_address'],
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
        this.getSunInfo();
      });
  }

  private getSunInfo() {
    this.sunService
      .getSunInfo(this.geoLocation.latitude, this.geoLocation.longitude, this.currentDateTime, this.getTimeZoneOffsetInSeconds())
      .subscribe( data => {
        const polarDay = data['polarDay'];
        const polarNight = data['polarNight'];
        if (polarDay) {
          this.sunInfo = {
            sunrise: '-',
            sunset: '-',
            duration: 'Polar day (24h)',
            polarDay: true,
            polarNight: false
          };  
        } else if (polarNight) {
          this.sunInfo = {
            sunrise: '-',
            sunset: '-',
            duration: 'Polar night (0h)',
            polarDay: false,
            polarNight: true
          };
        } else {
          this.sunInfo = {
            sunrise: this.getTimeAsString(data['sunrise']),
            sunset: this.getTimeAsString(data['sunset']),
            duration: this.getTimeAsString(data['duration']),
            polarDay: false,
            polarNight: false
          };
        }
      });
  }

  private getCurrentTimestamp() : number {
    return Math.round(this.currentDateTime.getTime() / 1000);
  }

  private getTimeZoneOffsetInSeconds() : number {
    return this.timeZone.rawOffset + this.timeZone.dstOffset
  }

  private getTimeZoneOffset() : string {
    const offsetInMinutes = this.getTimeZoneOffsetInSeconds() / 60;
    const hoursPart = Math.floor(offsetInMinutes / 60);
    const hoursPartString = `${Math.abs(hoursPart)}`.padStart(2, '0');
    const minutesPartString = `${offsetInMinutes % 60}`.padStart(2, '0');
    return `${(hoursPart >= 0) ? '+' : '-'}${hoursPartString}${minutesPartString}`;
  }

  private getTimeAsString(time: any) : string {
    const hour = `${time['hour']}`.padStart(2, '0')
    const minute = `${time['minute']}`.padStart(2, '0')
    const second = `${time['second']}`.padStart(2, '0')
    return `${hour}:${minute}:${second}`
  }
}
