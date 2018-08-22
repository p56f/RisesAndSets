import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { GeoInfoComponent } from './geoinfo/geoinfo.component';

import { NgbDatePLParserFormatter } from './ngb-date-plparser-formatter';

import { DmsPipe } from './dms.pipe';
import { HoursPipe } from './hours.pipe';

import * as apis from '../private/external.apis.json';

@NgModule({
  declarations: [
    AppComponent,
    GeoInfoComponent,
    DmsPipe,
    HoursPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: apis['googleAPIs']['key']
    }),
    NgbModule.forRoot()
  ],
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDatePLParserFormatter}],
  bootstrap: [AppComponent]
})
export class AppModule { }
