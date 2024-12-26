import {
  Controller,
  Delete,
  HttpCode,
  Param,
  Get,
  Post,
  Body,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { UserDto, UserListDto } from "./dto/user.dto";
import { CreateUserPayload } from "./payload/create-user.payload";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: "모든 유저 정보 조회" })
  @ApiOkResponse({ type: UserListDto })
  async getAllUsers(): Promise<UserListDto> {
    return this.userService.getAllUsers();
  }

  @Post()
  @ApiOperation({ summary: "유저 생성" })
  @ApiCreatedResponse({ type: UserDto })
  async createUser(@Body() payload: CreateUserPayload): Promise<UserDto> {
    return this.userService.createUser(payload);
  }
}
