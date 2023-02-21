import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

import { SelectService } from '@service';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements OnInit {
  @Output() folderSelected = new EventEmitter<void>();

  constructor(public electronSelectService: SelectService) {}

  ngOnInit() {
    this.electronSelectService.selectedFolder = '';
    this.electronSelectService.selectedFolder$
      .pipe(
        filter((folder) => !!folder),
        take(1)
      )
      .subscribe(() => {
        this.folderSelected.emit();
      });
  }

  openSelectFolderDialog() {
    this.electronSelectService.openSelectFolder();
  }

  selectFolder(folderPath: string) {
    this.electronSelectService.selectedFolder = folderPath;
  }
}
