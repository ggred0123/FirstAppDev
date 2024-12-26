import { PrismaService } from "../common/services/prisma.service";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserData } from "./type/user-data.type";
import { CreateUserPayload } from "./payload/create-user.payload";
import { CreateUserData } from "./type/create-user-data.dto";
@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(userId: number): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  }

  async isEmailUnique(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user === null;
  }
  async getAllUsers(): Promise<UserData[]> {
    const users = this.prisma.user.findMany({
      select: {
        id: true,
        userName: true,
        email: true,
        birthday: true,
        phoneNumber: true,
        instagramId: true,
        createdAt: true,
      },
    });
    return users;
  }
  async createUser(payload: CreateUserPayload): Promise<CreateUserData> {
    return this.prisma.user.create({
      data: {
        userName: payload.userName,
        email: payload.email,
        birthday: payload.birthday,
        phoneNumber: payload.phoneNumber,
        instagramId: payload.instagramId,
      },
      select: {
        id: true,
        userName: true,
        email: true,
        birthday: true,
        phoneNumber: true,
        instagramId: true,
        createdAt: true,
      },
    });
  }
}
