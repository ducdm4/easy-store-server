import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { KeyValue } from 'src/common/constant';

const SHIPPER_WAITING_CALL_ROOM = 'shipperWaitingCall';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {}
