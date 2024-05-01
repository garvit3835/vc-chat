import express, { Express, Request, Response } from "express";
import http from "http";
import SocketService from "./services/socket";
import { startMessageConsumer } from "./services/kafka";

const app : Express = express()

// async function init() {
//   startMessageConsumer();
//   const socketService = new SocketService();

//   const httpServer = http.createServer();
//   const PORT = process.env.PORT ? process.env.PORT : 8000;

//   socketService.io.attach(httpServer);

//   httpServer.listen(PORT, () =>
//     console.log(`HTTP Server started at PORT:${PORT}`)
//   );

//   socketService.initListeners();
// }

// init();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

const chatServer = app.listen(5001, () => {
  console.log("chat-server listening at port");
});

export default chatServer;

