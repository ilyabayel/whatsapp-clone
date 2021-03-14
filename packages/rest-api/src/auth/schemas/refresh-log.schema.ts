import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type RefreshLogDocument = RefreshLog & Document;

@Schema()
export class RefreshLog {
  @Prop({ required: true })
  @ApiProperty({ uniqueItems: true })
  userId: string;

  @Prop({ required: true })
  @ApiProperty()
  refreshToken: string;

  @Prop({ required: true })
  @ApiProperty()
  uaHash: string;
}

export const RefreshLogSchema = SchemaFactory.createForClass(RefreshLog);
