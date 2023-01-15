import { IMessage } from './message-payload';
import { ScanMessageEnum } from './scan-message.enum';

export interface IScanMessage<PAYLOAD>
  extends IMessage<ScanMessageEnum, PAYLOAD> {}
