import { ScanMessageEnum } from '../enum';
import { IMessage } from './message-payload.interface';

export type IScanMessage<PAYLOAD = never> = IMessage<ScanMessageEnum, PAYLOAD>;
