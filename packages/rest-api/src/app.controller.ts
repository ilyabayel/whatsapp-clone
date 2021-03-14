import { Controller, Get, Param } from "@nestjs/common";
import { Public } from "./__decorators__/public";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { WsClientService } from "./ws-client/ws-client.service";

@ApiTags("App")
@Controller()
export class AppController {
  constructor(private readonly wsClientService: WsClientService) {}

  @Public()
  @Get()
  get() {
    return "Hello there";
  }

  @Get("/wstoken")
  @ApiBearerAuth()
  getToken(@Param("channel") channel: string) {
    return this.wsClientService.getToken(channel);
  }
}
