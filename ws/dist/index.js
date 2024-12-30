"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 3600 });
let connectedUsers = [];
const connection = new Map();
wss.on("connection", (ws) => {
    let userId = null;
    ws.on("message", (message) => {
        var _a;
        const data = JSON.parse(message.toString());
        if (data.type === "NOTESUBSCRIBE") {
            connection.set(data.RemoteId, [
                ...(connection.get(data.RemoteId) || []),
                data.id,
            ]);
            console.log("CHECK MAP", connection);
        }
        if (data.type === "NOTEAUTHORSUBSCRIBE") {
            console.log("COMING HERE TO CHECK THE MESSAGE");
            (_a = connection.get(data.userId)) === null || _a === void 0 ? void 0 : _a.map((eachUser) => {
                var _a;
                const currentwsUser = connectedUsers.find((connUser) => connUser.id == eachUser);
                (_a = currentwsUser === null || currentwsUser === void 0 ? void 0 : currentwsUser.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({
                    type: "NOTETYPE",
                    data: Object.assign({}, data.noteContent),
                }));
            });
        }
        if (data.type === "SUBSCRIBE") {
            if (!connectedUsers.some((user) => user.id === data.id)) {
                userId = data.id;
                connectedUsers.push(Object.assign(Object.assign({}, data), { ws }));
                PublishMessage();
            }
            else
                return;
        }
    });
    ws.on("close", () => {
        console.log("CLOSING");
        connectedUsers = connectedUsers.filter((users) => users.id !== userId);
        PublishMessage();
    });
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
