-- CreateTable
CREATE TABLE "stock_holdings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brandId" TEXT NOT NULL,
    "shares" INTEGER NOT NULL,
    "costBasis" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "stock_holdings_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "stock_prices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brandId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "currentPrice" REAL NOT NULL,
    "dividendYield" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "stock_prices_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "stock_holdings_brandId_idx" ON "stock_holdings"("brandId");

-- CreateIndex
CREATE INDEX "stock_prices_brandId_idx" ON "stock_prices"("brandId");

-- CreateIndex
CREATE INDEX "stock_prices_date_idx" ON "stock_prices"("date");

-- CreateIndex
CREATE UNIQUE INDEX "stock_prices_brandId_date_key" ON "stock_prices"("brandId", "date");

