import { Module } from "@nestjs/common";
import { WsClientService } from "./ws-client.service";

@Module({
  providers: [WsClientService],
  exports: [WsClientService],
})
export class WsClientModule {}
