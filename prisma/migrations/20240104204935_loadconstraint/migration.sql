/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,loadNum]` on the table `Load` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Load_ownerId_loadNum_key" ON "Load"("ownerId", "loadNum");
