import { ApiProperty } from "@nestjs/swagger";
import { User } from "../schemas/user.schema";

export class UserDocumentDto extends User {
  @ApiProperty({ uniqueItems: true })
  _id: string;

  @ApiProperty()
  __v: number;
}
