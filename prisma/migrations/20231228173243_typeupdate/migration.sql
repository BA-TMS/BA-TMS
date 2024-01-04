-- AlterTable
ALTER TABLE "Carrier" ALTER COLUMN "postCode" SET DATA TYPE TEXT,
ALTER COLUMN "telephone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Consignee" ALTER COLUMN "postCountry" SET DATA TYPE TEXT,
ALTER COLUMN "postCode" SET DATA TYPE TEXT,
ALTER COLUMN "telephone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "postCountry" SET DATA TYPE TEXT,
ALTER COLUMN "postCode" SET DATA TYPE TEXT,
ALTER COLUMN "telephone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Driver" ALTER COLUMN "telephone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Factor" ALTER COLUMN "postCountry" SET DATA TYPE TEXT,
ALTER COLUMN "postCode" SET DATA TYPE TEXT,
ALTER COLUMN "telephone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Insurer" ALTER COLUMN "postCountry" SET DATA TYPE TEXT,
ALTER COLUMN "postCode" SET DATA TYPE TEXT,
ALTER COLUMN "telephone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "postCountry" SET DATA TYPE TEXT,
ALTER COLUMN "postCode" SET DATA TYPE TEXT,
ALTER COLUMN "telephone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Organization" ALTER COLUMN "postCountry" SET DATA TYPE TEXT,
ALTER COLUMN "postCode" SET DATA TYPE TEXT,
ALTER COLUMN "telephone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Shipper" ALTER COLUMN "postCountry" SET DATA TYPE TEXT,
ALTER COLUMN "postCode" SET DATA TYPE TEXT,
ALTER COLUMN "telephone" SET DATA TYPE TEXT;
