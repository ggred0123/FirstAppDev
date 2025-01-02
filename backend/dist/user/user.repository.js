"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prisma_service_1 = require("../common/services/prisma.service");
const common_1 = require("@nestjs/common");
let UserRepository = class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserById(userId) {
        return this.prisma.user.findFirst({
            where: {
                id: userId,
                deletedAt: null,
            },
        });
    }
    async isEmailUnique(email) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        return user === null;
    }
    async getAllUsers() {
        const users = this.prisma.user.findMany({
            where: {
                deletedAt: null,
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
        return users;
    }
    async createUser(payload) {
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
    async updateUser(id, data) {
        return this.prisma.user.update({
            where: {
                id: id,
                deletedAt: null,
            },
            data: {
                userName: data.userName,
                email: data.email,
                birthday: data.birthday,
                phoneNumber: data.phoneNumber,
                instagramId: data.instagramId,
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
    async getUserByUserName(userName) {
        return this.prisma.user.findMany({
            where: {
                userName: userName,
                deletedAt: null,
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
    async deleteUser(id) {
        await this.prisma.$transaction([
            this.prisma.userImage.deleteMany({
                where: {
                    user: {
                        id: id,
                    },
                },
            }),
            this.prisma.user.update({
                where: { id: id },
                data: {
                    deletedAt: new Date(),
                },
            }),
        ]);
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepository);
//# sourceMappingURL=user.repository.js.map