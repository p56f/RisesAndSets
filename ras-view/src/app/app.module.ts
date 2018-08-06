import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { GeoInfoComponent } from './geoinfo/geoinfo.component';

import * as apis from '../private/external.apis.json';

@NgModule({
  declarations: [
    AppComponent,
    GeoInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: apis['googleAPIs']['key']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
