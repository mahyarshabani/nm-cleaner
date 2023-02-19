import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScanPageEnum } from '@enum';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScanComponent {
  private pageBS$ = new BehaviorSubject<ScanPageEnum>(ScanPageEnum.SELECT);
  public page$ = this.pageBS$.asObservable();
  PAGE = ScanPageEnum;

  goToStart() {
    this.pageBS$.next(ScanPageEnum.START);
  }

  goToResult() {
    this.pageBS$.next(ScanPageEnum.RESULT);
  }

  goToSelect() {
    this.pageBS$.next(ScanPageEnum.SELECT);
  }
}
