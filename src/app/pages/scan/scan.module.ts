import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanComponent } from './scan.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [{ path: '', component: ScanComponent }];

@NgModule({
  declarations: [ScanComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ScanModule {}
