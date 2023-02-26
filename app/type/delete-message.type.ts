import { DeleteMessageEnum } from '../enum';
import { IMessage } from '../interface';

export type DeleteMessageType<PAYLOAD> = IMessage<DeleteMessageEnum, PAYLOAD>;
