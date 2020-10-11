import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {GoogleMapsModule} from "@angular/google-maps";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiInterceptor} from "./_interceptors/api-interceptor";
import { SearchComponent } from './_components/search/search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PricingDataComponent } from './_bottomsheet/pricing-data/pricing-data.component';
import { NeighborhoodDataComponent } from './_bottomsheet/neighborhood-data/neighborhood-data.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PricingDataComponent,
    NeighborhoodDataComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    GoogleMapsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
/*    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
