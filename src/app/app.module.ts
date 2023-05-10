import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {InputTextModule} from 'primeng/inputtext';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HeaderInterceptor} from "./core/header.interceptor";
import {PubgService} from "./services/pubg.service";
import {HomeModule} from "./home/home.module";
import {CardModule} from 'primeng/card';
import {FormsModule} from "@angular/forms";
import {TabViewModule} from 'primeng/tabview';
import {ListboxModule} from "primeng/listbox";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InputTextModule,
    HttpClientModule,
    HomeModule,
    CardModule,
    FormsModule,
    ListboxModule,
  ],
  providers: [
    PubgService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
