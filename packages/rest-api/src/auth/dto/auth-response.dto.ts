import { ApiProperty } from "@nestjs/swagger";

export class AuthResponseDto {
  @ApiProperty({
    name: "accessToken",
  })
  userId: string;

  @ApiProperty({
    name: "accessToken",
  })
  accessToken: string;

  @ApiProperty({
    name: "expiresIn",
  })
  expiresIn: string;

  @ApiProperty({
    name: "refreshToken",
  })
  refreshToken: string;
}
