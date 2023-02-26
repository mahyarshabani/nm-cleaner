import { SizeMessageEnum } from '../enum';
import { IMessage } from '../interface';

export type SizeMessageType<PAYLOAD> = IMessage<SizeMessageEnum, PAYLOAD>;
