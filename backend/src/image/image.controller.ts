import { Body, Controller, Post, Get } from "@nestjs/common";
import { ImageDto, ImageListDto } from "./dto/image.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadedFile, UseInterceptors } from "@nestjs/common";
import { ImageService } from "./image.service";
import { CreateImagePayload } from "./payload/create-images.payload";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiConsumes,
} from "@nestjs/swagger";

@Controller("images")
@ApiTags("Image API")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post("upload")
  @ApiOperation({ summary: "이미지 생성" })
  @ApiCreatedResponse({ type: ImageDto })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  async createImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: CreateImagePayload
  ): Promise<ImageDto> {
    return this.imageService.createImage(file, payload);
  }

  @Get()
  @ApiOperation({ summary: "이미지 리스트" })
  @ApiOkResponse({ type: ImageListDto })
  async getImages(): Promise<ImageListDto> {
    const images = await this.imageService.getImages();
    return ImageListDto.fromArray(images);
  }
  @Get(":instagramId")
  @ApiOperation({ summary: "유저별 이미지 리스트" })
  @ApiOkResponse({ type: ImageListDto })
  async getImagesByInstagramId(
    @Body() instagramId: string
  ): Promise<ImageListDto> {
    const images = await this.imageService.getImagesByInstagramId(instagramId);
    return ImageListDto.fromArray(images);
  }
}
