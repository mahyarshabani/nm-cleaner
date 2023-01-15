export interface IMessage<MESSAGE_TYPE, PAYLOAD_TYPE> {
  type: MESSAGE_TYPE;
  payload: PAYLOAD_TYPE;
}
