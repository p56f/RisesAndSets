import { Component, OnInit } from '@angular/core';

import { NgbDateStruct, NgbModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { faSearch, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import * as moment from 'moment-timezone';

import { DateChangeDialogComponent } from '../datechangedialog/datechangedialog.component';

import { GeoLocation } from '../geolocation';
import { GeoLocationService } from '../geolocation.service';

import { TimeZone } from '../timezone';
import { TimeZoneService } from '../timezone.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { SunInfo } from '../suninfo';
import { SunService } from '../sun.service';
import { MoonService } from '../moon.service';

@Component({
  selector: 'app-geoInfo',
  templateUrl: './geoinfo.component.html',
  styleUrls: ['./geoinfo.component.css'],
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class GeoInfoComponent implements OnInit {
  
  private _address = '';
  
  private _geoLocation : GeoLocation;

  private _centerLocation : GeoLocation;

  private _timeZone : TimeZone;

  private _sunInfo : SunInfo;

  private _dateTime = new Date();

  private _selectedDate: NgbDateStruct;
  
  private _selectedTime: NgbTimeStruct;

  private _selectedTimeZoneId: string;
  
  private _timeZoneOffset = '';

  private _moonPhase = '';

  private _mapHeight = 0;

  private _collapsed = false;

  constructor(
    private geoLocationService : GeoLocationService,
    private timeZoneService: TimeZoneService,
    private sunService: SunService, 
    private moonService: MoonService,
    private modalService: NgbModal,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this._centerLocation = {
      formattedAddress: undefined,
      latitude: 51.1,
      longitude: 17
    };
    this._timeZoneOffset = this.getTimeZoneOffsetFromMinutes(-this._dateTime.getTimezoneOffset());
    this._mapHeight = window.innerHeight;
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

  get dateTime() {
    return this._dateTime;
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

  get searchIcon() {
    return faSearch;
  }

  get collapsedIcon() {
    return (this._collapsed) ? faAngleDoubleRight : faAngleDoubleLeft;
  }

  get collapsed() {
    return this._collapsed;
  }

  getGeoInfoForAddress() {
    this.spinnerService.show();
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
      }, _ => {
        this.spinnerService.hide();
      });
  }

  onChooseLocation(event) {
    this._address = '';
    this._geoLocation = {
      formattedAddress: undefined,
      latitude: event.coords.lat,
      longitude: event.coords.lng
    };
    this.spinnerService.show();
    this.geoLocationService
      .getFormattedAddress(this._geoLocation.latitude, this._geoLocation.longitude)
      .subscribe( data => {
        this._geoLocation.formattedAddress = data['results'][0]['formatted_address'];
        this._collapsed = false;
        this.getTimeZone();
      }, _ => {
        this.spinnerService.hide();
      });
  }

  onResize() {
    this._mapHeight = window.innerHeight;
  }

  openChangeDateDialog() {
    const modalRef = this.modalService.open(DateChangeDialogComponent);
    const componentInstance = modalRef.componentInstance;
    componentInstance.parentDate = (this._timeZone) ? moment.tz(this._dateTime, this._timeZone.timeZoneId) 
      : moment(this._dateTime);
    modalRef.result.then( _ => {
      this._selectedDate = componentInstance.dateModel;
      this._selectedTime = componentInstance.timeModel;
      this._selectedTimeZoneId = (this._timeZone) ? this._timeZone.timeZoneId : null;
      this.spinnerService.show();
      this.getTimeZone();
    }, _ => {});
  }

  changeDateToNow() {
    this._selectedDate = undefined;
    this._selectedTime = undefined;
    this.spinnerService.show();
    this.getTimeZone();
  }

  collapse() {
    this._collapsed = !this._collapsed;
  }

  private getTimeZone() {
    this._dateTime = this.getDateAndTime();
    if (this._geoLocation) {
      this.timeZoneService
      .getTimeZone(this._geoLocation.latitude, this._geoLocation.longitude, this.getTimestamp())
      .subscribe( tz => {
        this._timeZone = tz;
        this._timeZoneOffset = this.getTimeZoneOffset();
        this.getSunInfo();
      }, _ => {
        this.spinnerService.hide();
      });
    } else {
      this.spinnerService.hide();
      this._timeZoneOffset = this.getTimeZoneOffsetFromMinutes(-this._dateTime.getTimezoneOffset());
    }
  }

  private getSunInfo() {
    this.sunService
      .getSunInfo(this._geoLocation.latitude, this._geoLocation.longitude, this._dateTime, this.getTimeZoneOffsetInSeconds())
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
        this.getMoonPhase();
      }, _ => {
        this.spinnerService.hide();
        this._sunInfo = undefined;
        this._moonPhase = undefined;
      })
  }

  private getMoonPhase() {
    this.moonService
      .getMoonInfo(this._dateTime, this._timeZone.timeZoneId)
      .subscribe( data => {
        this.spinnerService.hide();
        this._moonPhase = this.getMoonPhaseName(data['phase']);
      }, _ => {
        this.spinnerService.hide();
        this._moonPhase = undefined;
      });
  }

  private getDateAndTime() : Date {
    if (this._selectedDate && this._selectedTime) {
      const baseMoment = moment({
        year: this._selectedDate.year,
        month: this._selectedDate.month - 1, 
        date: this._selectedDate.day, 
        hours: this._selectedTime.hour, 
        minutes: this._selectedTime.minute
      });
      const m = (this._selectedTimeZoneId) ? moment.tz(baseMoment.format('YYYY-MM-DD HH:mm'), this._selectedTimeZoneId) : baseMoment;
      return m.toDate();
    }
    return new Date();
  }

  private getTimestamp() : number {
    return Math.round(this._dateTime.getTime() / 1000);
  }

  private getTimeZoneOffsetInSeconds() : number {
    return this._timeZone.rawOffset + this._timeZone.dstOffset
  }

  private getTimeZoneOffset() : string {
    const offsetInMinutes = this.getTimeZoneOffsetInSeconds() / 60;
    return this.getTimeZoneOffsetFromMinutes(offsetInMinutes);
  }

  private getTimeZoneOffsetFromMinutes(offsetInMinutes: number) : string {
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
