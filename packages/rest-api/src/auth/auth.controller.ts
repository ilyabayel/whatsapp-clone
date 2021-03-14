import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from "./auth.service";
import { Public } from "../__decorators__/public";
import { RefreshLog } from "./schemas/refresh-log.schema";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Login success",
    type: AuthResponseDto,
  })
  async login(
    @Request() req,
    @Body() body: LoginDto,
  ): Promise<AuthResponseDto> {
    return this.authService.login({
      userId: req.user._doc._id,
      uaHash: body.uaHash,
    });
  }

  @Public()
  @Post("register")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Register success",
    type: AuthResponseDto,
  })
  async register(@Body() body: RegisterDto): Promise<AuthResponseDto | any> {
    return this.authService.register(body);
  }

  @Public()
  @Post("refresh")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Token refresh success",
    type: AuthResponseDto,
  })
  refresh(@Body() body: RefreshLog) {
    return this.authService.refresh(body);
  }
}
