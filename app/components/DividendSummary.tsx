import type {
  Brand,
  StockHolding,
  StockPrice,
  DividendMonth,
} from "@prisma/client";

type DividendSummaryProps = {
  holdings: (StockHolding & {
    brand: Brand & {
      prices: StockPrice[];
      dividendMonths: DividendMonth[];
    };
  })[];
};

export function DividendSummary({ holdings }: DividendSummaryProps) {
  // 年間配当見込額を計算
  const annualDividend = holdings.reduce((sum, holding) => {
    const latestPrice = holding.brand.prices[0]?.currentPrice || 0;
    const dividendYield = holding.brand.prices[0]?.dividendYield || 0;
    const dividendPerShare = (latestPrice * dividendYield) / 100;
    return sum + dividendPerShare * holding.shares;
  }, 0);

  // 月別配当金額を計算
  const monthlyDividends = holdings.reduce((acc, holding) => {
    const latestPrice = holding.brand.prices[0]?.currentPrice || 0;
    const dividendYield = holding.brand.prices[0]?.dividendYield || 0;
    const dividendPerShare = (latestPrice * dividendYield) / 100;
    const annualDividendPerStock = dividendPerShare * holding.shares;

    // 配当月ごとに金額を分配
    const monthCount = holding.brand.dividendMonths.length;
    if (monthCount > 0) {
      const dividendPerMonth = annualDividendPerStock / monthCount;
      for (const { month } of holding.brand.dividendMonths) {
        acc[month] = (acc[month] || 0) + dividendPerMonth;
      }
    }

    return acc;
  }, {} as Record<number, number>);

  return (
    <div className="space-y-6">
      {/* 年間配当見込額 */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">年間配当見込額</h3>
        <p className="text-2xl font-bold text-blue-600">
          ¥{annualDividend.toLocaleString()}
        </p>
      </div>

      {/* 月別配当金額 */}
      <div>
        <h3 className="text-lg font-semibold mb-2">月別配当金額</h3>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <div
              key={month}
              className={`p-3 rounded-lg ${
                monthlyDividends[month] ? "bg-green-50" : "bg-gray-50"
              }`}
            >
              <div className="text-sm">{month}月</div>
              <div className="font-semibold">
                ¥{(monthlyDividends[month] || 0).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
