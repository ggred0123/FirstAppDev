import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateImagePayload } from "./payload/create-images.payload";
import { ImageDto, ImageListDto } from "./dto/image.dto";
import { ImageData } from "./type/image-data.type";
import { ImageRepository } from "./image.repository";
import { url } from "inspector";

@Injectable()
export class ImageService {
  constructor(private readonly imageRepository: ImageRepository) {}

  async createImage(payload: CreateImagePayload): Promise<ImageDto> {
    const createdAt = new Date(payload.createdAt);

    const data = {
      url: payload.url,
      instagramIds: payload.instagramIds,
      createdAt: payload.createdAt,
    };

    const image = await this.imageRepository.createImage(data);

    return ImageDto.from(image);
  }

  async getImages(): Promise<ImageListDto> {
    const images = await this.imageRepository.getImages();

    return ImageListDto.fromArray(images);
  }

  async getImagesByInstagramId(instagramId: string): Promise<ImageListDto> {
    const images =
      await this.imageRepository.getImagesByInstagramId(instagramId);

    return ImageListDto.fromArray(images);
  }

  async getImageById(imageId: number): Promise<ImageDto> {
    const image = await this.imageRepository.getImageById(imageId);
    if (!image) {
      throw new NotFoundException("Image not found");
    }
    return ImageDto.from(image);
  }
}
