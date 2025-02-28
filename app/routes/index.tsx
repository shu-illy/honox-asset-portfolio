import { createRoute } from "honox/factory";
import { fetchPrismaClient } from "../lib/prisma";
import type { Brand } from "@prisma/client";

export default createRoute(async (c) => {
  const prisma = await fetchPrismaClient(c.env.DB);
  const brands = await prisma.brand.findMany();
  console.log(brands);
  return c.render(
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">銘柄一覧</h1>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                銘柄
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                証券コード
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {brands.map((brand: Brand) => (
              <tr key={brand.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {brand.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {brand.stockCode}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
