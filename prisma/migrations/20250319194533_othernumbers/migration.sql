-- CreateTable
CREATE TABLE "Numbers" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "name" TEXT NOT NULL,
    "dispatch" BOOLEAN NOT NULL DEFAULT false,
    "orgId" TEXT NOT NULL,

    CONSTRAINT "Numbers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Numbers" ADD CONSTRAINT "Numbers_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
