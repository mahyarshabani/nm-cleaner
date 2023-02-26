export class SizeUtil {
  static bytesToMegaBytes(bytes: number): number {
    return +(bytes / 1024 / 1024).toFixed(0);
  }
}
