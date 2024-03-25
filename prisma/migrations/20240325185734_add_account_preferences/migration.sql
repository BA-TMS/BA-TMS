-- CreateTable
CREATE TABLE "AccountPreferences" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "primaryContactName" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "tollFree" TEXT NOT NULL,
    "fei" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "dateFormat" TEXT NOT NULL,
    "timeFormat" TEXT NOT NULL,
    "calendarFormat" TEXT NOT NULL,
    "mileageSystem" TEXT NOT NULL,
    "printSetting" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountPreferences_id_key" ON "AccountPreferences"("id");
