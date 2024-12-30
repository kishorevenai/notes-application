import { WebSocketServer } from "ws";
import { IncomeMessage } from "./types";
const wss = new WebSocketServer({ port: 3600 });

let connectedUsers: IncomeMessage[] = [];
const connection: Map<string, string[]> = new Map();

wss.on("connection", (ws) => {
  let userId: string | Number | null = null;

  ws.on("message", (message) => {
    const data: IncomeMessage | any = JSON.parse(message.toString());

    if (data.type === "NOTESUBSCRIBE") {
      connection.set(data.RemoteId, [
        ...(connection.get(data.RemoteId) || []),
        data.id,
      ]);

      console.log("CHECK MAP", connection);
    }

    if (data.type === "NOTEAUTHORSUBSCRIBE") {
      console.log("COMING HERE TO CHECK THE MESSAGE");
      connection.get(data.userId)?.map((eachUser) => {
        const currentwsUser = connectedUsers.find(
          (connUser) => connUser.id == eachUser
        );
        currentwsUser?.ws?.send(
          JSON.stringify({
            type: "NOTETYPE",
            data: { ...data.noteContent },
          })
        );
      });
    }

    if (data.type === "SUBSCRIBE") {
      if (!connectedUsers.some((user) => user.id === data.id)) {
        userId = data.id;
        connectedUsers.push({
          ...data,
          ws,
        });

        PublishMessage();
      } else return;
    }
  });

  ws.on("close", () => {
    console.log("CLOSING");
    connectedUsers = connectedUsers.filter((users) => users.id !== userId);
    PublishMessage();
  });
});

const PublishMessage = () => {
  connectedUsers.map((user) =>
    user.ws?.send(
      JSON.stringify({
        type: "ACTIVEUSERS",
        users: connectedUsers.map((eachUser) => ({
          id: eachUser.id,
          username: eachUser.username,
        })),
      })
    )
  );
};
