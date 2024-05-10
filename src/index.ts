import express, { Express, Request, Response } from "express";
import http from "http";
import SocketService from "./services/socket";
import { startMessageConsumer } from "./services/kafka";

const app: Express = express()

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
  // Introduce a CPU-intensive task
  const calculatePrimes = () => {
    let primes = [];
    for (let i = 2; i < 10000; i++) {
      let isPrime = true;
      for (let j = 2; j <= Math.sqrt(i); j++) {
        if (i % j === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) {
        primes.push(i);
      }
    }
    return primes;
  };

  // Call the CPU-intensive task
  const primes = calculatePrimes();

  res.status(200).send("Hello World! hmmm ok hmmm okai hm ok");
});


app.get("/test", async (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

const chatServer = app.listen(5000, () => {
  console.log("chat-server listening at 5000");
});

export default chatServer;

