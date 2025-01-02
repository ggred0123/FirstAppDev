import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/services/prisma.service";
import { CreateImageData } from "./type/create-image-data.type";
import { ImageData } from "./type/image-data.type";
import { ImageListDto } from "./dto/image.dto";

@Injectable()
export class ImageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createImage(data: CreateImageData): Promise<ImageData> {
    return this.prisma.image.create({
      data: {
        url: data.url,
        createdAt: data.createdAt,
        userImage: {
          createMany: {
            data: data.instagramIds.map((instagramId) => ({
              instagramId,
            })),
          },
        },
      },
      select: {
        id: true,
        url: true,
        userImage: {
          select: {
            instagramId: true,
          },
        },
        createdAt: true,
      },
    });
  }

  async getImages(): Promise<ImageData[]> {
    return this.prisma.image.findMany({
      where: {
        userImage: {
          some: {
            user: {
              deletedAt: null,
            },
          },
        },
      },
      select: {
        id: true,
        url: true,
        userImage: {
          select: {
            instagramId: true,
          },
        },
        createdAt: true,
      },
    });
  }

  async getImagesByInstagramId(instagramId: string): Promise<ImageData[]> {
    return this.prisma.image.findMany({
      where: {
        userImage: {
          some: {
            instagramId,
            user: {
              deletedAt: null, // 검색하는 사용자가 삭제되지 않은 경우만 확인
            },
          },
        },
      },
      select: {
        id: true,
        url: true,
        userImage: {
          select: {
            // where와 select 구조 수정
            instagramId: true,
          },
        },
        createdAt: true,
      },
    });
  }
  async getImageById(imageId: number): Promise<ImageData | null> {
    return this.prisma.image.findUnique({
      where: {
        id: imageId,
      },
      select: {
        id: true,
        url: true,
        userImage: {
          where: {
            user: {
              deletedAt: null, // 삭제되지 않은 사용자의 이미지만 선택
            },
          },
          select: {
            instagramId: true,
          },
        },
        createdAt: true,
      },
    });
  }
}
