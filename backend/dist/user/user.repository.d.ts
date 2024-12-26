import { PrismaService } from "../common/services/prisma.service";
import { User } from "@prisma/client";
import { UserData } from "./type/user-data.type";
import { CreateUserPayload } from "./payload/create-user.payload";
import { CreateUserData } from "./type/create-user-data.dto";
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserById(userId: number): Promise<User | null>;
    isEmailUnique(email: string): Promise<boolean>;
    getAllUsers(): Promise<UserData[]>;
    createUser(payload: CreateUserPayload): Promise<CreateUserData>;
}
