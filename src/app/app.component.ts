import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ElectronScanService } from './services/electron-scan.service';
import { ElectronSelectService } from './services/electron-select.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

}
