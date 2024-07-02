/*
  Warnings:

  - The values [OPENED,ASSIGNED,IN_TRANSIT,DELIVERED,PAID] on the enum `LoadStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LoadStatus_new" AS ENUM ('PENDING', 'OPEN', 'REFUSED', 'COVERED', 'DISPATCHED', 'ON_ROUTE', 'LOADING_UNLOADING', 'IN_YARD');
ALTER TABLE "Load" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Load" ALTER COLUMN "status" TYPE "LoadStatus_new" USING ("status"::text::"LoadStatus_new");
ALTER TYPE "LoadStatus" RENAME TO "LoadStatus_old";
ALTER TYPE "LoadStatus_new" RENAME TO "LoadStatus";
DROP TYPE "LoadStatus_old";
ALTER TABLE "Load" ALTER COLUMN "status" SET DEFAULT 'OPEN';
COMMIT;

-- AlterTable
ALTER TABLE "Load" ALTER COLUMN "status" SET DEFAULT 'OPEN';
