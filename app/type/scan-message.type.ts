import { ScanMessageEnum } from '../enum';
import { IMessage } from '../interface';

export type ScanMessageType<PAYLOAD = never> = IMessage<
  ScanMessageEnum,
  PAYLOAD
>;
