"use client";

import type { Brand, StockHolding, StockPrice } from "@prisma/client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type SectorChartProps = {
  holdings: (StockHolding & {
    brand: Brand & {
      prices: StockPrice[];
    };
  })[];
};

export function SectorChart({ holdings }: SectorChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 業種ごとの評価額を集計
  const sectorTotals = holdings.reduce((acc, holding) => {
    const latestPrice = holding.brand.prices[0]?.currentPrice || 0;
    const marketValue = latestPrice * holding.shares;
    const sector = holding.brand.sector;

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

  const options = {
    plugins: {
      legend: {
        position: "right" as const,
      },
      // tooltip: {
      //   callbacks: {
      //     label: (context: any) => {
      //       const value = context.raw as number;
      //       const total = Object.values(sectorTotals).reduce(
      //         (a: number, b: number) => a + b,
      //         0
      //       );
      //       const percentage = ((value / total) * 100).toFixed(1);
      //       return `¥${value.toLocaleString()} (${percentage}%)`;
      //     },
      //   },
      // },
    },
  };

  if (!mounted) {
    return <div className="w-full h-[400px] bg-gray-100 animate-pulse" />;
  }

  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="hoge">hoge</div>
      <Pie data={data} options={options} />
    </div>
  );
}
