import { Module } from "@nestjs/common";
import { ImageService } from "./image.service";
import { ImageController } from "./image.controller";
import { ImageRepository } from "./image.repository";
import { AwsS3Module } from "src/common/aws/aws-s3.module";

@Module({
  imports: [AwsS3Module],
  providers: [ImageService, ImageRepository],
  controllers: [ImageController],
})
export class ImageModule {}
