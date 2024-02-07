-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addressAddOn" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postCountry" INTEGER NOT NULL,
    "postCode" INTEGER NOT NULL,
    "telCountry" INTEGER NOT NULL,
    "telephone" INTEGER NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "orgId" INTEGER NOT NULL,
    "role" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Load" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "loadNum" INTEGER NOT NULL,
    "carrierId" INTEGER NOT NULL,
    "driverId" INTEGER,
    "customerId" INTEGER NOT NULL,
    "originId" INTEGER,
    "destId" INTEGER,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Load_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carrier" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addressAddOn" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postCountry" TEXT NOT NULL,
    "postCode" INTEGER NOT NULL,
    "telCountry" INTEGER NOT NULL,
    "telephone" INTEGER NOT NULL,
    "dotId" INTEGER NOT NULL,
    "factorId" INTEGER,

    CONSTRAINT "Carrier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "license" INTEGER NOT NULL,
    "telCountry" INTEGER NOT NULL,
    "telephone" INTEGER NOT NULL,
    "employerId" INTEGER NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addressAddOn" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postCountry" INTEGER NOT NULL,
    "postCode" INTEGER NOT NULL,
    "telCountry" INTEGER NOT NULL,
    "telephone" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipper" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addressAddOn" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postCountry" INTEGER NOT NULL,
    "postCode" INTEGER NOT NULL,
    "telCountry" INTEGER NOT NULL,
    "telephone" INTEGER NOT NULL,

    CONSTRAINT "Shipper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consignee" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addressAddOn" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postCountry" INTEGER NOT NULL,
    "postCode" INTEGER NOT NULL,
    "telCountry" INTEGER NOT NULL,
    "telephone" INTEGER NOT NULL,

    CONSTRAINT "Consignee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addressAddOn" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postCountry" INTEGER NOT NULL,
    "postCode" INTEGER NOT NULL,
    "telCountry" INTEGER NOT NULL,
    "telephone" INTEGER NOT NULL,
    "isShipper" BOOLEAN NOT NULL,
    "isConsignee" BOOLEAN NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Factor" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addressAddOn" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postCountry" INTEGER NOT NULL,
    "postCode" INTEGER NOT NULL,
    "telCountry" INTEGER NOT NULL,
    "telephone" INTEGER NOT NULL,

    CONSTRAINT "Factor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insurer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addressAddOn" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postCountry" INTEGER NOT NULL,
    "postCode" INTEGER NOT NULL,
    "telCountry" INTEGER NOT NULL,
    "telephone" INTEGER NOT NULL,

    CONSTRAINT "Insurer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoverageMatrix" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "carrierId" INTEGER NOT NULL,
    "insurerId" INTEGER NOT NULL,
    "coverageCategory" INTEGER NOT NULL,

    CONSTRAINT "CoverageMatrix_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "Carrier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_originId_fkey" FOREIGN KEY ("originId") REFERENCES "Shipper"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_destId_fkey" FOREIGN KEY ("destId") REFERENCES "Consignee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrier" ADD CONSTRAINT "Carrier_factorId_fkey" FOREIGN KEY ("factorId") REFERENCES "Factor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "Carrier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
