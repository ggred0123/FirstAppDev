import { ApiProperty } from "@nestjs/swagger";
import { forEach } from "lodash";
import { IsString, IsDate, IsArray } from "class-validator";
import { Transform, Type } from "class-transformer";

export class CreateImagePayload {
  @IsString()
  @ApiProperty({
    description: "이미지 파일 링크",
    type: String,
  })
  url!: string;

  @Transform(({ value }) => {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return value.split(",");
      }
    }
    return value;
  })
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: "같이 업로드할 인스타그램 ID",
    type: [String],
  })
  instagramIds!: string[];

  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: "이미지 생성일",
    type: Date,
  })
  createdAt!: Date;
}
