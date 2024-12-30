-- AlterTable
ALTER TABLE "images" ALTER COLUMN "created_at" DROP DEFAULT;

-- CreateTable
CREATE TABLE "user_images" (
    "user_image_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "image_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_images_pkey" PRIMARY KEY ("user_image_id")
);
