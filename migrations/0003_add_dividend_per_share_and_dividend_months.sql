-- CreateTable
CREATE TABLE "dividend_months" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brandId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "dividend_months_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "dividend_months_brandId_idx" ON "dividend_months"("brandId");

-- CreateIndex
CREATE UNIQUE INDEX "dividend_months_brandId_month_key" ON "dividend_months"("brandId", "month");

