import {
  IsDate,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class PatchUpdateUserPayload {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: "유저 이름",
    type: String,
  })
  userName?: string | null;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    description: "유저 이메일",
    type: String,
    nullable: true,
  })
  email?: string | null;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiPropertyOptional({
    description: "유저 생일",
    type: Date,
    nullable: true,
  })
  birthday?: Date | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: "유저 전화번호",
    type: String,
  })
  phoneNumber?: string | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: "유저 인스타그램 ID",
    type: String,
  
  })
  instagramId?: string | null;
}
