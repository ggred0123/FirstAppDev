/*
  Warnings:

  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
CREATE SEQUENCE user_user_id_seq;
ALTER TABLE "user" DROP COLUMN "password",
ALTER COLUMN "user_id" SET DEFAULT nextval('user_user_id_seq');
ALTER SEQUENCE user_user_id_seq OWNED BY "user"."user_id";
