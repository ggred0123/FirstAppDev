import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { configModule } from "./modules/config.module";
import { LoggerMiddleware } from "../common/middlewares/logger.middleware";
import { CommonModule } from "../common/common.module";

import { UserModule } from "../user/user.module";
import { ImageModule } from "src/image/image.module";
import { AwsS3Module } from "../common/aws/aws.module";
@Module({
  imports: [configModule, CommonModule, UserModule, ImageModule, AwsS3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
