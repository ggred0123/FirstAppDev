import { UserRepository } from "./user.repository";
import { UserDto, UserListDto } from "./dto/user.dto";
import { PatchUpdateUserPayload } from "./payload/patch-update-user.payload";
import { CreateUserPayload } from "./payload/create-user.payload";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    getAllUsers(): Promise<UserListDto>;
    createUser(payload: CreateUserPayload): Promise<UserDto>;
    updateUser(id: number, payload: PatchUpdateUserPayload): Promise<UserDto>;
    getUserByUserName(userName: string): Promise<UserListDto>;
}
