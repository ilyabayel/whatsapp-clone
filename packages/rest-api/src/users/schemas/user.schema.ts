import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty()
  @Prop({ required: true })
  fullName: string;

  @ApiProperty({ uniqueItems: true })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ required: false })
  @Prop()
  imageUrl?: string;

  @ApiProperty()
  @Prop({ required: true })
  password: string;
}

export type UserSecured = Omit<User, "password">;

export const UserSchema = SchemaFactory.createForClass(User);
