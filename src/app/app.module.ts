import { NgModule } from "@angular/core";
import {AppComponent} from "./app.component";
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HeaderComponent} from "../../projects/template-test-ng/src/lib/header/header.component";
import {FooterComponent} from "../../projects/template-test-ng/src/lib/footer/footer.component";
import {BodyComponent} from "../../projects/template-test-ng/src/lib/body/body.component";
import {MenuComponent} from "../../projects/template-test-ng/src/lib/menu/menu.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgbCollapseModule,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    MenuComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
