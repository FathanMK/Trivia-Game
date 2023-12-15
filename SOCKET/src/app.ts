import express from "express";
import { createServer } from "node:http";
import socket from "./socket";

const app = express();
const server = createServer(app);

socket(server);

server.listen(5005, () => {
  console.log("Socket.io Server is running on 5005");
});
