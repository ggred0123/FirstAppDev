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
  Patch,
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
import { PatchUpdateUserPayload } from "./payload/patch-update-user.payload";
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

  @Patch(":id")
  @ApiOperation({ summary: "유저 정보 수정" })
  @ApiOkResponse({ type: UserDto })
  async updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() payload: PatchUpdateUserPayload
  ): Promise<UserDto> {
    return this.userService.updateUser(id, payload);
  }

  @Get(":userName")
  @ApiOperation({ summary: "유저 이름으로 조회" })
  @ApiOkResponse({ type: UserListDto })
  async getUserByUserName(
    @Param("userName") userName: string
  ): Promise<UserListDto> {
    return this.userService.getUserByUserName(userName);
  }

  @Delete(":id")
  @ApiOperation({ summary: "유저 삭제" })
  @ApiNoContentResponse()
  async deleteUser(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
