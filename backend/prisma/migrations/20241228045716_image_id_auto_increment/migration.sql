-- AlterTable
CREATE SEQUENCE image_image_id_seq;
ALTER TABLE "image" ALTER COLUMN "image_id" SET DEFAULT nextval('image_image_id_seq');
ALTER SEQUENCE image_image_id_seq OWNED BY "image"."image_id";
