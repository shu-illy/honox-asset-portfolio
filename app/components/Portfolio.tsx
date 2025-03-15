import type {
  Brand,
  DividendMonth,
  StockHolding,
  StockPrice,
} from "@prisma/client";
import { DividendSummary } from "./DividendSummary";
import { SectorChart } from "../islands/SectorChart";

type PortfolioProps = {
  holdings: (StockHolding & {
    brand: Brand & {
      prices: StockPrice[];
      dividendMonths: DividendMonth[];
    };
  })[];
};

export function Portfolio({ holdings }: PortfolioProps) {
  // 総資産額を計算
  const totalAssets = holdings.reduce((sum, holding) => {
    const latestPrice = holding.brand.prices[0]?.currentPrice || 0;
    return sum + latestPrice * holding.shares;
  }, 0);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">ポートフォリオ</h1>

      {/* 保有銘柄一覧 */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">銘柄コード</th>
              <th className="px-4 py-2">銘柄名</th>
              <th className="px-4 py-2">業種</th>
              <th className="px-4 py-2">保有株数</th>
              <th className="px-4 py-2">現在値</th>
              <th className="px-4 py-2">評価額</th>
              <th className="px-4 py-2">構成比</th>
              <th className="px-4 py-2">配当利回り</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding) => {
              const latestPrice = holding.brand.prices[0]?.currentPrice || 0;
              const marketValue = latestPrice * holding.shares;
              const ratio = (marketValue / totalAssets) * 100;

              return (
                <tr key={holding.id} className="border-b">
                  <td className="px-4 py-2">{holding.brand.stockCode}</td>
                  <td className="px-4 py-2">{holding.brand.name}</td>
                  <td className="px-4 py-2">{holding.brand.sector}</td>
                  <td className="px-4 py-2 text-right">
                    {holding.shares.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-right">
                    ¥{latestPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-right">
                    ¥{marketValue.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-right">{ratio.toFixed(2)}%</td>
                  <td className="px-4 py-2 text-right">
                    {holding.brand.prices[0]?.dividendYield.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 業種別割合の円グラフ */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">業種別構成比</h2>
          <SectorChart holdings={holdings} />
        </div>

        {/* 配当情報 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">配当情報</h2>
          <DividendSummary holdings={holdings} />
        </div>
      </div>
    </div>
  );
}
