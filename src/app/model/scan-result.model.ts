export class ScanResult {
  path: string;
  mTime: string;
  deleting = false;
  deleted = false;
  size: number;
  sizeCalculating = false;

  constructor(path: string, mTime: Date) {
    this.mTime = mTime.toLocaleString()
    this.path = path;
  }
}
