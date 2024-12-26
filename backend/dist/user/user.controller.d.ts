import { UserService } from "./user.service";
import { UserDto, UserListDto } from "./dto/user.dto";
import { CreateUserPayload } from "./payload/create-user.payload";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<UserListDto>;
    createUser(payload: CreateUserPayload): Promise<UserDto>;
}
