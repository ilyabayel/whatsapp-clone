import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class Room {
  @ApiProperty()
  @Prop({ required: true })
  participants: string[];

  @ApiProperty({ required: false })
  @Prop()
  imageUrl: string;

  @ApiProperty()
  @Prop({ required: true })
  isGroup: boolean;

  @ApiProperty({ required: false })
  @Prop()
  name: string;
}

export type RoomDocument = Room & Document;

export class RoomDocumentClass extends Room {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  __v: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
