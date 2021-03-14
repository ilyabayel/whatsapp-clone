import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import * as moment from "moment";
import { Model } from "mongoose";
import { UsersService } from "../users/users.service";
import { RefreshLog, RefreshLogDocument } from "./schemas/refresh-log.schema";
import { UserSecured } from "../users/schemas/user.schema";
import { jwtConstants } from "../../configs/authConstants";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(RefreshLog.name)
    private refreshTokenModel: Model<RefreshLogDocument>,
  ) {}

  protected async genAndSaveRefreshToken(userData: {
    userId: string;
    uaHash: string;
  }): Promise<RefreshLogDocument> {
    const refreshToken = this.jwtService.sign(
      { type: "refresh" },
      { expiresIn: 0 },
    );
    const refreshLog: RefreshLog = {
      refreshToken,
      userId: userData.userId,
      uaHash: userData.uaHash,
    };
    const createdRefreshLog = new this.refreshTokenModel(refreshLog);
    return createdRefreshLog.save();
  }

  protected generateAccessToken(email: string) {
    return this.jwtService.sign({ email });
  }

  async validateUser(email: string, pass: string): Promise<UserSecured> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }

    if (user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    throw new HttpException(
      "Email and password does not match",
      HttpStatus.FORBIDDEN,
    );
  }

  async login(userData: {
    userId: string;
    uaHash: string;
  }): Promise<AuthResponseDto> {
    const accessToken = this.generateAccessToken(userData.userId);
    const { refreshToken } = await this.genAndSaveRefreshToken({
      userId: userData.userId,
      uaHash: userData.uaHash,
    });
    return {
      userId: userData.userId,
      accessToken,
      expiresIn: moment()
        .add(parseInt(jwtConstants.expiresIn) - 1, "s")
        .toISOString(),
      refreshToken,
    };
  }

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const createdUser = await this.usersService.create(registerDto);
    return await this.login({
      uaHash: registerDto.uaHash,
      userId: createdUser._id,
    });
  }

  async refresh(refreshLog: RefreshLog): Promise<AuthResponseDto> {
    for (const key in refreshLog) {
      if (!refreshLog[key]) {
        throw new HttpException(
          `Invalid ${key} field in body`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const refreshLogFromDb = await this.refreshTokenModel.findOneAndDelete({
      userId: refreshLog.userId,
      refreshToken: refreshLog.refreshToken,
      uaHash: refreshLog.uaHash,
    });

    if (!refreshLogFromDb) {
      throw new HttpException(
        "No refresh log issued to this user",
        HttpStatus.NOT_FOUND,
      );
    }

    const accessToken = this.generateAccessToken(refreshLog.userId);
    const { refreshToken } = await this.genAndSaveRefreshToken({
      userId: refreshLog.userId,
      uaHash: refreshLog.uaHash,
    });

    return {
      userId: refreshLog.userId,
      accessToken,
      expiresIn: moment()
        .add(parseInt(jwtConstants.expiresIn) - 1, "s")
        .toISOString(),
      refreshToken,
    };
  }
}
