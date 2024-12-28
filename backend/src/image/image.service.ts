import { Injectable } from "@nestjs/common";
import { CreateImagePayload } from "./payload/create-images.payload";
import { ImageDto } from "./dto/image.dto";
import { ImageData } from "./type/image-data.type";
import { ImageRepository } from "./image.repository";
import { url } from "inspector";
import { S3Service } from "src/common/aws/aws-s3.service";

@Injectable()
export class ImageService {
  constructor(
    private readonly imageRepository: ImageRepository,
    private readonly s3Service: S3Service
  ) {}

  async createImage(
    file: Express.Multer.File,
    payload: CreateImagePayload
  ): Promise<ImageDto> {
    const s3Key = `images/${Date.now()}-${file.originalname}`;
    const url = await this.s3Service.uploadFile(file, s3Key);

    const data = {
      url,
      instagramIds: payload.instagramIds,
      createdAt: payload.createdAt,
    };

    const image = await this.imageRepository.createImage(data);

    return ImageDto.from(image);
  }

  async getImages(): Promise<ImageData[]> {
    const images = await this.imageRepository.getImages();

    return images;
  }

  async getImagesByInstagramId(instagramId: string): Promise<ImageData[]> {
    const images =
      await this.imageRepository.getImagesByInstagramId(instagramId);

    return images;
  }
}
