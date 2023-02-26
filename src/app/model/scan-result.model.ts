export class ScanResult {
  path: string;
  mTime: string;
  deleting = false;
  deleted = false;

  constructor(path: string, mTime: Date) {
    this.mTime = mTime.toLocaleString()
    this.path = path;
  }
}
