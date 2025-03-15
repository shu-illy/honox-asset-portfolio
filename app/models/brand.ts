import type { Brand } from "@prisma/client";

export const sectorName = (brand: Brand) => {
  const sector = brand.sector;
  switch (sector) {
    case "CONSTRUCTION":
      return "建設業";
    case "MANUFACTURING":
      return "製造業";
    case "INFORMATION_TECH":
      return "情報通信業";
    case "TRANSPORT":
      return "運輸・郵便業";
    case "WHOLESALE":
      return "卸売業";
    case "RETAIL":
      return "小売業";
    case "FINANCE":
      return "金融・保険業";
    case "REAL_ESTATE":
      return "不動産業";
    case "SERVICES":
      return "サービス業";
    case "ELECTRIC_GAS":
      return "電気・ガス業";
    default:
      // biome-ignore lint/correctness/noSwitchDeclarations: <explanation>
      // biome-ignore lint/correctness/noUnusedVariables: <explanation>
      const unreachable: never = sector;
      throw new Error(`Unknown sector: ${unreachable}`);
  }
};
