export interface IMessage<MESSAGE_TYPE, PAYLOAD_TYPE = any> {
  type: MESSAGE_TYPE;
  payload?: PAYLOAD_TYPE;
}
