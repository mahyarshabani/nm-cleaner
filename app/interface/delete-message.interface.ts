import { DeleteMessageEnum } from '../enum';
import { IMessage } from './message-payload.interface';

export type IDeleteMessage<PAYLOAD> = IMessage<DeleteMessageEnum, PAYLOAD>;
