import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
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
  async createImage(@Body() payload: CreateImagePayload): Promise<ImageDto> {
    return this.imageService.createImage(payload);
  }

  @Get()
  @ApiOperation({ summary: "이미지 리스트" })
  @ApiOkResponse({ type: ImageListDto })
  async getImages(): Promise<ImageListDto> {
    return this.imageService.getImages();
  }
  @Get("instagram/:instagramId")
  @ApiOperation({ summary: "유저별 이미지 리스트" })
  @ApiOkResponse({ type: ImageListDto })
  async getImagesByInstagramId(
    @Param("instagramId") instagramId: string
  ): Promise<ImageListDto> {
    return this.imageService.getImagesByInstagramId(instagramId);
  }

  @Get("detail/:imageId")
  @ApiOperation({ summary: "이미지 상세" })
  @ApiOkResponse({ type: ImageDto })
  async getImageById(
    @Param("imageId", ParseIntPipe) imageId: number
  ): Promise<ImageDto> {
    return this.imageService.getImageById(imageId);
  }
}
