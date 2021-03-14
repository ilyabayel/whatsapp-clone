import { Injectable, Logger } from "@nestjs/common";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Room, RoomDocument } from "./schemas/room.schema";

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);

  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  create(createRoomDto: CreateRoomDto) {
    const createdRoom = new this.roomModel(createRoomDto);
    return createdRoom.save();
  }

  findAll() {
    return this.roomModel.find().exec();
  }

  findOne(id: string) {
    return this.roomModel.findById(id);
  }

  findByUser(userId: string) {
    this.logger.log(userId);
    return this.roomModel.find({ participants: { $all: [userId] } });
  }

  update(id: string, updateRoomDto: UpdateRoomDto) {
    return this.roomModel.findByIdAndUpdate(
      id,
      {
        ...updateRoomDto,
        $inc: { __v: 1 },
      },
      { new: true },
    );
  }

  addUserToRoom(roomId: string, userId: string) {
    return this.roomModel.findByIdAndUpdate(
      roomId,
      {
        $addToSet: { participants: userId },
        $inc: { __v: 1 },
      },
      { new: true },
    );
  }

  removeUserFromRoom(roomId: string, userId: string) {
    return this.roomModel.findByIdAndUpdate(
      roomId,
      {
        $pull: { participants: userId },
        $inc: { __v: 1 },
      },
      { new: true },
    );
  }

  remove(id: string) {
    return this.roomModel.findByIdAndRemove(id);
  }
}
