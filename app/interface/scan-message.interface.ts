import { ScanMessageEnum } from '../enum/scan-message.enum';
import { IMessage } from './message-payload.interface';

export interface IScanMessage<PAYLOAD = any>
  extends IMessage<ScanMessageEnum, PAYLOAD> {}
