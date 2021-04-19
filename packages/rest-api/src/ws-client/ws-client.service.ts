import { Injectable } from "@nestjs/common";
import * as Centrifuge from "centrifuge";
import { Logger } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import * as WebSocket from "ws";
import { MessageDocument } from "../messages/schemas/message.schema";

@Injectable()
export class WsClientService {
  centrifuge: Centrifuge;
  logger: Logger;
  interval: NodeJS.Timeout | null;

  constructor() {
    this.logger = new Logger("WsClientService");

    this.centrifuge = new Centrifuge(process.env.CENTRIFUGO_URI, {
      websocket: WebSocket,
    });

    this.centrifuge.setToken(this.getToken());

    this.centrifuge.on("connect", (ctx) => {
      this.logger.log("Connected to centrifugo", ctx);
      clearInterval(this.interval);
    });

    this.centrifuge.on("disconnect", (ctx) => {
      this.logger.log("Disconnected from centrifugo", ctx);
      this.logger.log(JSON.stringify(process.env));
      this.interval = setInterval(() => {
        this.logger.log("Trying to reconnect to centrifugo", ctx);
        this.centrifuge.connect();
      }, 5000);
    });

    this.centrifuge.on("publish", (ctx) => {
      console.log(ctx);
    });

    this.centrifuge.connect();
  }

  getToken(channel = "public"): string {
    return jwt.sign(
      {
        sub: "server",
        channel: channel,
      },
      "secret",
      {
        algorithm: "HS256",
      },
    );
  }

  publish(message: MessageDocument) {
    if (!this.centrifuge.isConnected()) this.centrifuge.connect();
    this.centrifuge
      .publish("public:" + message.roomId, message)
      .then(() => this.logger.log("Published"));
  }
}
