import { WebSocket } from "ws";
export type IncomeMessage = {
  type: string;
  RemoteId: string;
  id: string | Number;
  username: string;
  ws?: WebSocket;
};
