/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT 'Alex',
ADD COLUMN     "imageURL" TEXT,
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT 'Doe',
ADD COLUMN     "telCountry" TEXT NOT NULL DEFAULT '1',
ADD COLUMN     "telephone" TEXT;
