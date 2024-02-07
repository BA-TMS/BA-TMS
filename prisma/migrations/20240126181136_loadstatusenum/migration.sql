/*
  Warnings:

  - The `status` column on the `Load` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "LoadStatus" AS ENUM ('OPENED', 'ASSIGNED', 'IN_TRANSIT', 'DELIVERED', 'PAID');

-- AlterTable
ALTER TABLE "Load" DROP COLUMN "status",
ADD COLUMN     "status" "LoadStatus" NOT NULL DEFAULT 'OPENED';
