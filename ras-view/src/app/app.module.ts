import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { GeoInfoComponent } from './geoinfo/geoinfo.component';

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
      apiKey: 'AIzaSyDiokY2HUj9xPhUh2NnfUUEAGG9qKxuLvk'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
