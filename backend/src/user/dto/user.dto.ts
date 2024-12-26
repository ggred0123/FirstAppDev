import { ApiProperty } from "@nestjs/swagger";
import { from } from "form-data";
import { UserData } from "../type/user-data.type";
export class UserDto {
  @ApiProperty({
    description: "유저 ID",
    type: Number,
  })
  id!: number;

  @ApiProperty({
    description: "유저 이름",
    type: String,
  })
  userName!: string;

  @ApiProperty({
    description: "유저 이메일",
    type: String,
    nullable: true,
  })
  email!: string | null;

  @ApiProperty({
    description: "유저 생일",
    type: Date,
  })
  birthday!: Date;

  @ApiProperty({
    description: "유저 전화번호",
    type: String,
  })
  phoneNumber!: string;

  @ApiProperty({
    description: "유저 인스타그램 ID",
    type: String,
    nullable: true,
  })
  instagramId!: string | null;

  @ApiProperty({
    description: "유저 생성일",
    type: Date,
  })
  createdAt!: Date;

  static from(user: UserData): UserDto {
    return {
      id: user.id,
      userName: user.userName,
      email: user.email,
      birthday: user.birthday,
      phoneNumber: user.phoneNumber,
      instagramId: user.instagramId,
      createdAt: user.createdAt,
    };
  }

  static fromArray(users: UserData[]): UserDto[] {
    return users.map((user) => UserDto.from(user));
  }
}

export class UserListDto {
  @ApiProperty({
    description: "유저 목록",
    type: [UserDto],
  })
  users!: UserDto[];

  static from(users: UserData[]): UserListDto {
    return {
      users: UserDto.fromArray(users),
    };
  }
}
