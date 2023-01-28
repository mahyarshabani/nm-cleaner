import { DeleteMessageEnum } from '../enum';
import { IMessage } from './message-payload.interface';

export interface IDeleteMessage<PAYLOAD>
  extends IMessage<DeleteMessageEnum, PAYLOAD> {}
