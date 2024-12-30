"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 3600 });
let connectedUsers = [];
wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        const data = JSON.parse(message.toString());
        if (data.type === "SUBSCRIBE") {
            if (!connectedUsers.some((user) => user.id === data.id)) {
                connectedUsers.push(Object.assign(Object.assign({}, data), { ws }));
                PublishMessage();
            }
            else
                return;
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
    connectedUsers.map((user) => {
        var _a;
        return (_a = user.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({
            type: "ACTIVEUSERS",
            users: connectedUsers.map((eachUser) => ({
                id: eachUser.id,
                username: eachUser.username,
            })),
        }));
    });
};
