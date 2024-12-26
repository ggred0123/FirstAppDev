/*
  Warnings:

  - You are about to drop the column `profile_image` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `activity_keywords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `activity_location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `keyword` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recent_activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recommendations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_location` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `birthday` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "activity" DROP CONSTRAINT "activity_user_id_fkey";

-- DropForeignKey
ALTER TABLE "activity_keywords" DROP CONSTRAINT "activity_keywords_activity_id_fkey";

-- DropForeignKey
ALTER TABLE "activity_keywords" DROP CONSTRAINT "activity_keywords_keyword_id_fkey";

-- DropForeignKey
ALTER TABLE "recent_activity" DROP CONSTRAINT "recent_activity_activity_id_fkey";

-- DropForeignKey
ALTER TABLE "recent_activity" DROP CONSTRAINT "recent_activity_user_id_fkey";

-- DropForeignKey
ALTER TABLE "recommendations" DROP CONSTRAINT "recommendations_location_id_fkey";

-- DropForeignKey
ALTER TABLE "recommendations" DROP CONSTRAINT "recommendations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "recommendations" DROP CONSTRAINT "recommendations_user_location_id_fkey";

-- DropForeignKey
ALTER TABLE "user_location" DROP CONSTRAINT "user_location_user_id_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "profile_image",
DROP COLUMN "refresh_token",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "instagram_id" TEXT,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- DropTable
DROP TABLE "activity";

-- DropTable
DROP TABLE "activity_keywords";

-- DropTable
DROP TABLE "activity_location";

-- DropTable
DROP TABLE "keyword";

-- DropTable
DROP TABLE "recent_activity";

-- DropTable
DROP TABLE "recommendations";

-- DropTable
DROP TABLE "user_location";

-- CreateTable
CREATE TABLE "images" (
    "image_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("image_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_phoneNumber_key" ON "user"("phoneNumber");
