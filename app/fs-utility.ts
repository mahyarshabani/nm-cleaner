import { DeleteMessageEnum, ScanMessageEnum, SizeMessageEnum } from './enum';
import { FileService } from './services/file-service';
import { IScanResult, ISizeResult } from './interface';
import { DeleteMessageType, ScanMessageType, SizeMessageType } from './type';

process.parentPort.on('message', async (e) => {
  const fileService = new FileService();
  if (e.data.type === ScanMessageEnum.START_SCAN) {
    fileService.startScan(e.data.payload as string);
    fileService.scanResult$.subscribe({
      next: (item) => {
        const message: ScanMessageType<IScanResult> = {
          type: ScanMessageEnum.RETURN_RESULT,
          payload: item,
        };
        process.parentPort.postMessage(message);
      },
      complete: () => {
        const message: ScanMessageType<string> = {
          type: ScanMessageEnum.SCAN_COMPLETED,
        };
        process.parentPort.postMessage(message);
      },
    });
  }
  if (e.data.type === DeleteMessageEnum.DELETE) {
    fileService.delete(e.data.payload as string);
    fileService.deleteResult$.subscribe({
      next: (item) => {
        const message: DeleteMessageType<string> = {
          type: DeleteMessageEnum.DELETE_DONE,
          payload: item,
        };
        process.parentPort.postMessage(message);
      },
      // TODO: implement complete later
      // complete: () => {
      //   const message: IScanMessage<string> = {
      //     type: ScanMessageEnum.SCAN_COMPLETED,
      //   };
      //   process.parentPort.postMessage(message);
      // },
    });
  }
  fileService.folderSizeResult$.subscribe({
    next: (item) => {
      const message: SizeMessageType<ISizeResult> = {
        type: SizeMessageEnum.SIZE_CALCULATION_RESULT,
        payload: item,
      };
      process.parentPort.postMessage(message);
    },
  });
  fileService.folderSizeStarted$.subscribe({
    next: (item) => {
      const message: SizeMessageType<string> = {
        type: SizeMessageEnum.START_SIZE_CALCULATION,
        payload: item,
      };
      process.parentPort.postMessage(message);
    },
  });
});
