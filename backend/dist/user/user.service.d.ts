import { UserRepository } from "./user.repository";
import { UserDto, UserListDto } from "./dto/user.dto";
import { CreateUserPayload } from "./payload/create-user.payload";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    getAllUsers(): Promise<UserListDto>;
    createUser(payload: CreateUserPayload): Promise<UserDto>;
}
