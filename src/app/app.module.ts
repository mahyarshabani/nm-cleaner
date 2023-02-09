import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleBarComponent } from './layout/title-bar/title-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, TitleBarComponent],
  imports: [BrowserModule, RouterModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
