import { Server } from "socket.io";
import Redis from "ioredis";
import prismaClient from "./prisma";
import { produceMessage } from "./kafka";

const redisClient = new Redis();

class SocketService {
  private _io: Server;
  private _redisSub: Redis;
  private _redisPub: Redis;

  constructor() {
    console.log("Init Socket Service...");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    this._redisSub = new Redis();
    this._redisPub = new Redis();
    this._redisSub.subscribe("MESSAGES");
    this.initListeners();
  }

  public initListeners() {
    const io = this.io;
    const redisPub = this.redisPub;
    const redisSub = this.redisSub;
    console.log("Init Socket Listeners...");

    io.on("connect", async (socket) => {
      console.log(`New Socket Connected`, socket.id);
      const userId = socket.handshake.query.userId; // assuming userId is sent during connection
      if(userId) socket.join(userId); // Join a room for the user

      // Retrieve offline messages for the user and send them
      const offlineMessages = await redisClient.lrange(`messages:${userId}`, 0, -1);
      offlineMessages.forEach((message) => {
        socket.emit("message", JSON.parse(message));
      });
      await redisClient.del(`messages:${userId}`); // Clear offline messages after sending

      socket.on("event:message", async ({ message, recipient }: { message: string, recipient: string }) => {
        console.log("New Message Rec.", message);
        if (recipient) {
          // Direct message
          const recipientSocketIds = await io.in(recipient).allSockets();
          if (recipientSocketIds.size > 0) {
            // Recipient is online, send the message directly
            recipientSocketIds.forEach((socketId) => {
              io.to(socketId).emit("message", { sender: userId, message }); // Assuming userId is sender's ID
            });
          } else {
            // Recipient is offline, store the message in Redis
            await redisPub.lpush(`messages:${recipient}`, JSON.stringify({ sender: userId, message }));
          }
        } else {
          // Group message
          // Implement logic to send the message to group members
          // You may retrieve group members from a database or maintain a list in memory
          // Then, broadcast the message to group members who are online and store offline messages for offline members
        }

        // Publish message to Kafka
        await produceMessage(message);
        console.log("Message Produced to Kafka Broker");
      });
    });

    redisSub.on("message", async (channel, message) => {
      if (channel === "MESSAGES") {
        console.log("new message from redis", message);
        io.emit("message", message);
      }
    });
  }

  get io() {
    return this._io;
  }

  get redisSub() {
    return this._redisSub;
  }

  get redisPub() {
    return this._redisPub;
  }
}

export default SocketService;
