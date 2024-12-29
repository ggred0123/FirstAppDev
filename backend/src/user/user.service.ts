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
    if (payload.email) {
      const isEmailUnique = await this.userRepository.isEmailUnique(
        payload.email
      );
      if (!isEmailUnique) {
        throw new BadRequestException("Email is already in use");
      }
    }

    return this.userRepository.createUser(payload);
  }
  async updateUser(
    id: number,
    payload: PatchUpdateUserPayload
  ): Promise<UserDto> {
    if (
      payload.userName === null ||
      payload.email === null ||
      payload.birthday === null ||
      payload.phoneNumber === null ||
      payload.instagramId === null
    ) {
      throw new BadRequestException("Invalid payload");
    }

    const data = {
      userName: payload.userName,
      email: payload.email,
      birthday: payload.birthday,
      phoneNumber: payload.phoneNumber,
      instagramId: payload.instagramId,
    };

    return this.userRepository.updateUser(id, data);
  }

  async getUserByUserName(userName: string): Promise<UserListDto> {
    const users = await this.userRepository.getUserByUserName(userName);

    return UserListDto.from(users);
  }
}
