import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ uniqueItems: true })
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  uaHash: string;
}
