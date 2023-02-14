export class ScanResult {
  path: string;
  deleting = false;
  deleted = false;

  constructor(path: string) {
    this.path = path;
  }
}
