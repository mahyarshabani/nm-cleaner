import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScanComponent } from './scan.component';
import { ElectronScanService, ElectronSelectService } from '../../services';

describe('ScanComponent', () => {
  let component: ScanComponent;
  let fixture: ComponentFixture<ScanComponent>;
  let electronScanService: ElectronScanService;
  let electronSelectService: ElectronSelectService;

  beforeEach(async(() => {
    const electronScanService = jasmine.createSpyObj('ElectronScanService', [
      'startScan',
      'returnScanResult',
    ]);
    electronScanService.returnScanResult.and.returnValue([]);
    const electronSelectService = jasmine.createSpyObj(
      'ElectronSelectService',
      ['openSelectFolder']
    );
    TestBed.configureTestingModule({
      declarations: [ScanComponent],
      providers: [
        { provide: ElectronScanService, useValue: electronScanService },
        { provide: ElectronSelectService, useValue: electronSelectService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
