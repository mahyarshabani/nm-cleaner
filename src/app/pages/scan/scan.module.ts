import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanComponent } from './scan.component';
import { Route, RouterModule } from '@angular/router';
import { SelectComponent } from './select/select.component';
import { DragFolderOverDirective } from './drag-folder-over.directive';

const routes: Route[] = [{ path: '', component: ScanComponent }];

@NgModule({
  declarations: [ScanComponent, SelectComponent, DragFolderOverDirective],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ScanModule {}
