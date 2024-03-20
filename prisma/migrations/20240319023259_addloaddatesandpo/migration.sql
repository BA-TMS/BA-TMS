/*
  Warnings:

  - Added the required column `payOrderNum` to the `Load` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Load" ADD COLUMN     "deliveryDate" TIMESTAMP(3),
ADD COLUMN     "payOrderNum" TEXT NOT NULL,
ADD COLUMN     "shipDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
