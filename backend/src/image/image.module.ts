import { Module } from "@nestjs/common";
import { ImageService } from "./image.service";
import { ImageController } from "./image.controller";
import { ImageRepository } from "./image.repository";

@Module({
  providers: [ImageService, ImageRepository],
  controllers: [ImageController],
})
export class ImageModule {}
