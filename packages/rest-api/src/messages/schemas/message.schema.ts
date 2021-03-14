import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class Message {
  @ApiProperty()
  @Prop({ required: true })
  body: string;

  @ApiProperty()
  @Prop({ required: true })
  senderId: string;

  @ApiProperty()
  @Prop({ required: true })
  roomId: string;

  @ApiProperty()
  @Prop({ required: true })
  timestamp: string;

  @ApiProperty()
  @Prop({ required: true })
  images: string[];

  @ApiProperty()
  @Prop({ required: true })
  isRead: boolean;

  @ApiProperty()
  @Prop({ required: true })
  isDeleted: boolean;
}

export class MessageDocumentClass extends Message {
  @ApiProperty({ uniqueItems: true })
  _id: string;

  @ApiProperty()
  __v: number;
}

export type MessageDocument = Message & Document;

export const MessageSchema = SchemaFactory.createForClass(Message);
