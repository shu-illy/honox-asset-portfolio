import type { Brand, StockHolding, StockPrice } from "@prisma/client";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type TooltipItem,
} from "chart.js";
import type { FC } from "react";
import { Pie } from "react-chartjs-2";
import { sectorName } from "../models/brand";

type SectorChartProps = {
  holdings: (StockHolding & {
    brand: Brand & {
      prices: StockPrice[];
    };
  })[];
};

export const SectorChart: FC<SectorChartProps> = ({ holdings }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  // 業種ごとの評価額を集計
  const sectorTotals = holdings.reduce((acc, holding) => {
    const latestPrice = holding.brand.prices[0]?.currentPrice || 0;
    const marketValue = latestPrice * holding.shares;
    const sector = sectorName(holding.brand);

    acc[sector] = (acc[sector] || 0) + marketValue;
    return acc;
  }, {} as Record<string, number>);

  // 円グラフのデータを作成
  const data = {
    labels: Object.keys(sectorTotals),
    datasets: [
      {
        data: Object.values(sectorTotals),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ],
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    plugins: {
      legend: {
        position: "right" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"pie">) => {
            const value = context.raw as number;
            const total = Object.values(sectorTotals).reduce(
              (sum: number, item: number) => sum + item,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `¥${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <Pie data={data} options={options} />
    </div>
  );
};
