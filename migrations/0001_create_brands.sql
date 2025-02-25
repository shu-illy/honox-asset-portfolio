-- CreateTable
CREATE TABLE "brands" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "stockCode" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "marketSection" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "brands_stockCode_key" ON "brands"("stockCode");

-- CreateIndex
CREATE INDEX "brands_stockCode_idx" ON "brands"("stockCode");

-- CreateIndex
CREATE INDEX "brands_sector_idx" ON "brands"("sector");
