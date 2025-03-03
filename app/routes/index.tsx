import { createRoute } from "honox/factory";
import { fetchPrismaClient } from "../lib/prisma";
import { Portfolio } from "../components/Portfolio";

export default createRoute(async (c) => {
  const prisma = await fetchPrismaClient(c.env.DB);

  // 必要なデータを取得
  const holdings = await prisma.stockHolding.findMany({
    include: {
      brand: {
        include: {
          prices: {
            orderBy: {
              date: "desc",
            },
            take: 1,
          },
          dividendMonths: true,
        },
      },
    },
  });

  return c.render(
    <div className="container mx-auto px-4 py-8">
      <Portfolio holdings={holdings} />
    </div>
  );
});
