-- DropForeignKey
ALTER TABLE "user_image" DROP CONSTRAINT "user_image_user_id_fkey";

-- AlterTable
ALTER TABLE "user_image" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "user_image" ADD CONSTRAINT "user_image_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("instagram_id") ON DELETE RESTRICT ON UPDATE CASCADE;
