import { ApiProperty } from "@nestjs/swagger";
import { forEach } from "lodash";
import { IsString, IsDate, IsArray } from "class-validator";
import { Transform, Type } from "class-transformer";

export class CreateImagePayload {
  @ApiProperty({
    description: "업로드할 이미지 파일",
    type: "string",
    format: "binary",
  })
  file!: Express.Multer.File;

  @Transform(({ value }) => {
    // 문자열일 경우 JSON.parse 또는 쉼표로 나누어 배열로 변환
    if (typeof value === "string") {
      try {
        return JSON.parse(value); // JSON 배열 형태로 전송된 경우
      } catch {
        return value.split(","); // 쉼표로 구분된 문자열인 경우
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
