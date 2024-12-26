import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserDto, UserListDto } from "./dto/user.dto";
import { PatchUpdateUserPayload } from "./payload/patch-update-user.payload";
import { CreateUserPayload } from "./payload/create-user.payload";
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(): Promise<UserListDto> {
    const users = await this.userRepository.getAllUsers();
    return UserListDto.from(users);
  }

  async createUser(payload: CreateUserPayload): Promise<UserDto> {
    if (payload.email == undefined) {
      throw new BadRequestException("이메일은 필수입니다.");
    }

    return this.userRepository.createUser(payload);
  }
}
