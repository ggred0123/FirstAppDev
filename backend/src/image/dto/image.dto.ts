import { ApiProperty } from "@nestjs/swagger";
import { ImageData } from "../type/image-data.type";

export class ImageDto {
  @ApiProperty({
    description: "이미지 id",
    type: Number,
  })
  id!: number;

  @ApiProperty({
    description: "이미지 url",
    type: String,
  })
  url!: string;

  @ApiProperty({
    description: "이미지 이름",
    type: [String],
  })
  instagramIds!: string[];

  @ApiProperty({
    description: "이미지 생성일",
    type: Date,
  })
  createdAt!: Date;

  static from(data: ImageData): ImageDto {
    return {
      id: data.id,
      url: data.url,
      instagramIds: data.userImage.map((image) => image.instagramId),
      createdAt: data.createdAt,
    };
  }

  static fromArray(images: ImageData[]): ImageDto[] {
    return images.map((images) => ImageDto.from(images));
  }
}

export class ImageListDto {
  @ApiProperty({
    description: "이미지 리스트",
    type: [ImageDto],
  })
  images!: ImageDto[];

  static fromArray(images: ImageData[]): ImageListDto {
    return {
      images: ImageDto.fromArray(images),
    };
  }
}
