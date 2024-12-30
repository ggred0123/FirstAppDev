/*
  Warnings:

  - A unique constraint covering the columns `[instagram_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Made the column `instagram_id` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "instagram_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_instagram_id_key" ON "user"("instagram_id");
