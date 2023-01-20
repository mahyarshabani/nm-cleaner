import { ScanMessageEnum } from '../enum/scan-message.enum';
import { IMessage } from './message-payload.interface';

export interface IScanMessage<PAYLOAD>
  extends IMessage<ScanMessageEnum, PAYLOAD> {}
