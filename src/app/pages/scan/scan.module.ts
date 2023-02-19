import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { ScanComponent } from './scan.component';
import { SelectComponent } from './select/select.component';
import { DragFolderOverDirective } from './drag-folder-over.directive';
import { ResultComponent } from './result/result.component';
import { StartComponent } from './start/start.component';

const routes: Route[] = [{ path: '', component: ScanComponent }];

@NgModule({
  declarations: [
    ScanComponent,
    SelectComponent,
    DragFolderOverDirective,
    ResultComponent,
    StartComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ScanModule {}
