import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleBarComponent } from './layout/title-bar/title-bar.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './layout/menu/menu.component';
import { ELECTRON_API_TOKEN } from './constant/electron-api-token';

@NgModule({
  declarations: [AppComponent, TitleBarComponent, MenuComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: ELECTRON_API_TOKEN, useValue: window.electronAPI, multi: false },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
