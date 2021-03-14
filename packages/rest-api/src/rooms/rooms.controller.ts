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
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { RoomDocumentClass } from "./schemas/room.schema";

@ApiTags("Rooms")
@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Create new room",
    type: RoomDocumentClass,
  })
  @ApiBearerAuth()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Get all existing rooms",
    type: RoomDocumentClass,
    isArray: true,
  })
  @ApiBearerAuth()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(":roomId")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Find room by id",
    type: RoomDocumentClass,
  })
  @ApiBearerAuth()
  findOne(@Param("roomId") roomId: string) {
    return this.roomsService.findOne(roomId);
  }

  @Get("find-by-user/:userId")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Find rooms by user id",
    type: RoomDocumentClass,
    isArray: true,
  })
  @ApiBearerAuth()
  findByUser(@Param("userId") userId: string) {
    return this.roomsService.findByUser(userId);
  }

  @Put(":roomId")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Update room",
    type: RoomDocumentClass,
  })
  @ApiBearerAuth()
  update(
    @Param("roomId") roomId: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomsService.update(roomId, updateRoomDto);
  }

  @Put(":roomId/add-user/:userId")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Add user to room",
    type: RoomDocumentClass,
  })
  @ApiBearerAuth()
  addUser(@Param("roomId") roomId: string, @Param("userId") userId: string) {
    return this.roomsService.addUserToRoom(roomId, userId);
  }

  @Put(":roomId/remove-user/:userId")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Remove user from room",
    type: RoomDocumentClass,
  })
  @ApiBearerAuth()
  removeUser(@Param("roomId") roomId: string, @Param("userId") userId: string) {
    return this.roomsService.removeUserFromRoom(roomId, userId);
  }

  @Delete(":roomId")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Remove room",
    type: RoomDocumentClass,
  })
  @ApiBearerAuth()
  remove(@Param("roomId") roomId: string) {
    return this.roomsService.remove(roomId);
  }
}
