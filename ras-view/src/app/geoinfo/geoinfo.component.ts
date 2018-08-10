import { Component, OnInit } from '@angular/core';

import { GeoLocation } from '../geolocation';
import { GeoLocationService } from '../geolocation.service';

import { TimeZone } from '../timezone';
import { TimeZoneService } from '../timezone.service';

import { SunInfo } from '../suninfo';
import { SunService } from '../sun.service';
import { MoonService } from '../moon.service';

@Component({
  selector: 'app-geoInfo',
  templateUrl: './geoinfo.component.html',
  styleUrls: ['./geoinfo.component.css']
})
export class GeoInfoComponent implements OnInit {
  
  private _address = '';
  
  private _geoLocation : GeoLocation;

  private _centerLocation : GeoLocation;

  private _timeZone : TimeZone;

  private _sunInfo : SunInfo;

  private _currentDateTime = new Date();
  
  private _timeZoneOffset = '+0000';

  private _moonPhase = '';

  private _mapHeight = 0;

  constructor(
    private geoLocationService : GeoLocationService,
    private timeZoneService: TimeZoneService,
    private sunService: SunService, 
    private moonService: MoonService) { }

  ngOnInit() {
    this._geoLocation = {
      formattedAddress: '',
      latitude: 0,
      longitude: 0
    };
    this._centerLocation = {
      formattedAddress: '',
      latitude: 51.1,
      longitude: 17
    };
    this._mapHeight = Math.floor(0.97 * window.innerHeight);
  }

  get address() {
    return this._address;
  }

  set address(address: string) {
    this._address = address;
  }

  get geoLocation() {
    return this._geoLocation;
  }

  get centerLocation() {
    return this._centerLocation;
  }

  get timeZone() {
    return this._timeZone;
  }

  get sunInfo() {
    return this._sunInfo;
  }

  get currentDateTime() {
    return this._currentDateTime;
  }

  get timeZoneOffset() {
    return this._timeZoneOffset;
  }

  get moonPhase() {
    return this._moonPhase;
  }

  get mapHeight() {
    return this._mapHeight;
  }

  getGeoInfoForAddress() {
    this.geoLocationService.getLocation(this._address).subscribe( data => {
        const result = data['results'][0];
        const location = result['geometry']['location'];
        this._geoLocation = {
          formattedAddress: result['formatted_address'],
          latitude: location['lat'],
          longitude: location['lng']
        };
        this._centerLocation.latitude = this._geoLocation.latitude;
        this._centerLocation.longitude = this._geoLocation.longitude;
        this.getTimeZone();
      }
    );
  }

  onChooseLocation(event) {
    this._address = '';
    this._geoLocation.latitude = event.coords.lat;
    this._geoLocation.longitude = event.coords.lng;

    this.geoLocationService
      .getFormattedAddress(this._geoLocation.latitude, this._geoLocation.longitude)
      .subscribe( data => {
        this._geoLocation.formattedAddress = data['results'][0]['formatted_address'];
        this.getTimeZone();
      });
  }

  private getTimeZone() {
    this.timeZoneService
      .getTimeZone(this._geoLocation.latitude, this._geoLocation.longitude, this.getCurrentTimestamp())
      .subscribe( tz => {
        this._timeZone = tz;
        this._currentDateTime = new Date();
        this._timeZoneOffset = this.getTimeZoneOffset();
        this.getSunInfo();
        this.getMoonPhase();
      });
  }

  private getSunInfo() {
    this.sunService
      .getSunInfo(this._geoLocation.latitude, this._geoLocation.longitude, this._currentDateTime, this.getTimeZoneOffsetInSeconds())
      .subscribe( data => {
        const polarDay = data['polarDay'];
        const polarNight = data['polarNight'];
        if (polarDay) {
          this._sunInfo = {
            sunrise: '-',
            sunset: '-',
            duration: 'Polar day (24h)',
            polarDay: true,
            polarNight: false
          };  
        } else if (polarNight) {
          this._sunInfo = {
            sunrise: '-',
            sunset: '-',
            duration: 'Polar night (0h)',
            polarDay: false,
            polarNight: true
          };
        } else {
          this._sunInfo = {
            sunrise: this.getTimeAsString(data['sunrise']),
            sunset: this.getTimeAsString(data['sunset']),
            duration: this.getTimeAsString(data['duration']),
            polarDay: false,
            polarNight: false
          };
        }
      });
  }

  private getMoonPhase() {
    this.moonService
      .getMoonInfo(this._currentDateTime, this._timeZone.timeZoneId)
      .subscribe( data => {
        this._moonPhase = this.getMoonPhaseName(data['phase']);
      });
  }

  private getCurrentTimestamp() : number {
    return Math.round(this._currentDateTime.getTime() / 1000);
  }

  private getTimeZoneOffsetInSeconds() : number {
    return this._timeZone.rawOffset + this._timeZone.dstOffset
  }

  private getTimeZoneOffset() : string {
    const offsetInMinutes = this.getTimeZoneOffsetInSeconds() / 60;
    const hoursPart = Math.floor(offsetInMinutes / 60);
    const hoursPartString = Math.abs(hoursPart).toString().padStart(2, '0');
    const minutesPartString = (offsetInMinutes % 60).toString().padStart(2, '0');
    return `${(hoursPart >= 0) ? '+' : '-'}${hoursPartString}${minutesPartString}`;
  }

  private getTimeAsString(time: any) : string {
    const hour = time['hour'].toString().padStart(2, '0');
    const minute = time['minute'].toString().padStart(2, '0');
    const second = time['second'].toString().padStart(2, '0');
    return `${hour}:${minute}:${second}`;
  }

  private getMoonPhaseName(moonPhase: string) : string {
    return moonPhase.charAt(0) + moonPhase.substr(1).replace(/[A-Z]/, ' $&').toLowerCase();
  }
}
