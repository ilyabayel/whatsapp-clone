import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
} from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  MessageDocument,
  MessageDocumentClass,
} from "./schemas/message.schema";
import { WsClientService } from "../ws-client/ws-client.service";

@ApiTags("Messages")
@Controller("messages")
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly wsClientService: WsClientService,
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: MessageDocumentClass,
    description: "Create success",
  })
  @ApiBearerAuth()
  async create(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<MessageDocument> {
    const message = await this.messagesService.create(createMessageDto);
    this.wsClientService.publish(message);
    return message;
  }

  @Get(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    type: MessageDocumentClass,
  })
  @ApiBearerAuth()
  findOne(@Param("id") id: string): Promise<MessageDocument> {
    return this.messagesService.findOne(id);
  }

  @Get("find-by-room/:roomId")
  @ApiResponse({
    status: HttpStatus.OK,
    type: MessageDocumentClass,
    isArray: true,
  })
  @ApiBearerAuth()
  findByRoom(@Param("roomId") roomId: string): Promise<MessageDocument[]> {
    return this.messagesService.findByRoom(roomId);
  }

  @Put(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    type: MessageDocumentClass,
    description: "Update success",
  })
  @ApiBearerAuth()
  update(
    @Param("id") id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ): Promise<MessageDocument> {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    type: MessageDocumentClass,
    description: "Delete success",
  })
  @ApiBearerAuth()
  remove(@Param("id") id: string): Promise<MessageDocument> {
    return this.messagesService.remove(id);
  }
}
