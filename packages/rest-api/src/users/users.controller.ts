import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDocumentDto } from "./dto/user-document.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "User created successfully",
    type: UserDocumentDto,
  })
  @ApiBearerAuth()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Users found",
    type: [UserDocumentDto],
  })
  @ApiBearerAuth()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiBearerAuth()
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Put(":id")
  @ApiBearerAuth()
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
