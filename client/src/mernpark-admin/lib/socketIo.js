import socketIOClient from "socket.io-client";

export const socketInstance = socketIOClient("http://127.0.0.1:5000", { transports: ['websocket'], upgrade: false });