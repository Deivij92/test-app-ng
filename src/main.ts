import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {enableProdMode, importProvidersFrom} from "@angular/core";
import {environment} from "@ng-bootstrap/ng-bootstrap/environment";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app/app.module";

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
