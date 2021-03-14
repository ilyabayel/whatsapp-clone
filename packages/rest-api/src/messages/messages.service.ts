import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { Message, MessageDocument } from "./schemas/message.schema";

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<MessageDocument> {
    const createdMessage = new this.messageModel(createMessageDto);
    return createdMessage.save();
  }

  async findOne(id: string) {
    return this.messageModel.findById(id);
  }

  async findByRoom(roomId: string) {
    return this.messageModel.find({ roomId });
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    return this.messageModel.findByIdAndUpdate(
      id,
      { ...updateMessageDto, $inc: { __v: 1 } },
      { new: true },
    );
  }

  async remove(id: string) {
    return this.messageModel.findByIdAndRemove(id);
  }
}
