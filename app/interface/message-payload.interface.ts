export interface IMessage<MESSAGE_TYPE, PAYLOAD_TYPE = never> {
  type: MESSAGE_TYPE;
  payload?: PAYLOAD_TYPE;
}
