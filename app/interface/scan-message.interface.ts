import { ScanMessageEnum } from '../enum';
import { IMessage } from './message-payload.interface';

export interface IScanMessage<PAYLOAD = any>
  extends IMessage<ScanMessageEnum, PAYLOAD> {}
