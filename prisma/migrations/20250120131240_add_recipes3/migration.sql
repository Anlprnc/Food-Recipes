/*
  Warnings:

  - Made the column `image` on table `recipes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "recipes" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DATA TYPE TEXT;
