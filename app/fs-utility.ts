import { ScanMessageEnum } from './enum/scan-message.enum';
import { IScanMessage } from './interface/scan-message.interface';
import { FileService } from './services/file-service';
import { DeleteMessageEnum } from './enum/delete-message.enum';
import { IDeleteMessage } from './interface/delete-message.interface';

process.parentPort.once('message', async (e) => {
  const fileService = new FileService();
  if (e.data.type === ScanMessageEnum.START_SCAN) {
    const data: IScanMessage<string> = e.data;
    fileService.scanResult$.subscribe({
      next: (item) => {
        const message: IScanMessage<string> = {
          type: ScanMessageEnum.RETURN_RESULT,
          payload: item,
        };
        process.parentPort.postMessage(message);
      },
      complete: () => {
        // TODO: the process should not be exited. it should be always running to handle different messages
        process.exit();
      },
    });
    fileService.startScan(data.payload);
  }

  if (e.data.type === DeleteMessageEnum.DELETE) {
    const data: IDeleteMessage<string> = e.data;
    // TODO: implement delete
    // fileService.delete(data.payload);
  }
});
