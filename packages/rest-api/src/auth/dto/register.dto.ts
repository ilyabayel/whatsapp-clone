import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ uniqueItems: true })
  email: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  uaHash: string;
}
