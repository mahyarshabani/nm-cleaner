import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'scan', pathMatch: 'full' },
  {
    path: 'scan',
    loadChildren: () =>
      import('./pages/scan/scan.module').then((module) => module.ScanModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
