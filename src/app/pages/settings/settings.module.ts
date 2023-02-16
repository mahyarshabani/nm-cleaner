import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [{ path: '', component: SettingsComponent }];

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SettingsModule {}
