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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const user_dto_1 = require("./dto/user.dto");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getAllUsers() {
        const users = await this.userRepository.getAllUsers();
        return user_dto_1.UserListDto.from(users);
    }
    async createUser(payload) {
        if (payload.email) {
            const isEmailUnique = await this.userRepository.isEmailUnique(payload.email);
            if (!isEmailUnique) {
                throw new common_1.BadRequestException("Email is already in use");
            }
        }
        return this.userRepository.createUser(payload);
    }
    async updateUser(id, payload) {
        if (payload.userName === null ||
            payload.email === null ||
            payload.birthday === null ||
            payload.phoneNumber === null ||
            payload.instagramId === null) {
            throw new common_1.BadRequestException("Invalid payload");
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map