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





app.get("/", async (req: Request, res: Response) => {
  for (let i = 0; i < 100000000000; i++){
    i = i - 0.5;
  }

    res.status(200).send("Hello World!");

  
});

const chatServer = app.listen(5000, () => {
  console.log("chat-server listening at 5001");
});

export default chatServer;

