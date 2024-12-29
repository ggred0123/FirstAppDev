import { UserService } from "./user.service";
import { UserDto, UserListDto } from "./dto/user.dto";
import { CreateUserPayload } from "./payload/create-user.payload";
import { PatchUpdateUserPayload } from "./payload/patch-update-user.payload";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<UserListDto>;
    createUser(payload: CreateUserPayload): Promise<UserDto>;
    updateUser(id: number, payload: PatchUpdateUserPayload): Promise<UserDto>;
    getUserByUserName(userName: string): Promise<UserListDto>;
}
