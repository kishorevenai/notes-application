import { WebSocketServer } from "ws";
import { IncomeMessage } from "./types";

const wss = new WebSocketServer({ port: 3600 });

let connectedUsers: IncomeMessage[] = [];

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const data: IncomeMessage = JSON.parse(message.toString());

    if (data.type === "SUBSCRIBE") {
      if (!connectedUsers.some((user) => user.id === data.id)) {
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
    connectedUsers = connectedUsers.filter((users) => users.id !== data.id);
  });

  const allUsers = connectedUsers.map((eachUser) => ({
    id: eachUser.id,
    username: eachUser.username,
  }));
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
