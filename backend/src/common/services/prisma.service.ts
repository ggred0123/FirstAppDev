import { PrismaClient } from "@prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaService extends PrismaClient {
  imageModel: any;
  constructor() {
    super();
  }
}
