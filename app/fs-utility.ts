import { DeleteMessageEnum, ScanMessageEnum } from './enum';
import { IScanMessage } from './interface';
import { FileService } from './services/file-service';

process.parentPort.on('message', async (e) => {
  const fileService = new FileService();
  if (e.data.type === ScanMessageEnum.START_SCAN) {
    fileService.startScan(e.data.payload as string);
    fileService.scanResult$.subscribe({
      next: (item) => {
        const message: IScanMessage<string> = {
          type: ScanMessageEnum.RETURN_RESULT,
          payload: item,
        };
        process.parentPort.postMessage(message);
      },
      complete: () => {
        const message: IScanMessage<string> = {
          type: ScanMessageEnum.SCAN_COMPLETED,
        };
        process.parentPort.postMessage(message);
      },
    });
  }
  if (e.data.type === DeleteMessageEnum.DELETE) {
    fileService.delete(e.data.payload as string);
  }
});
