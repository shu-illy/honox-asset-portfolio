import { exec as execCallback } from 'node:child_process';
import { promisify } from 'node:util';
import { MarketSection, Sector } from '@prisma/client';

const exec = promisify(execCallback);

const brands = [
  {
    id: 'cltwqwx0g0000upxlgxff1234',
    name: 'トヨタ自動車',
    stockCode: '7203',
    sector: Sector.MANUFACTURING,
    marketSection: MarketSection.PRIME,
    description: '世界最大級の自動車メーカー。環境技術とモビリティサービスの開発に注力。',
  },
  {
    id: 'cltwqwx0g0001upxlgxff5678',
    name: 'ソニーグループ',
    stockCode: '6758',
    sector: Sector.ELECTRIC_GAS,
    marketSection: MarketSection.PRIME,
    description:
      'エレクトロニクス、エンタテインメント、金融サービスなど多角的に展開するグローバル企業。',
  },
  {
    id: 'cltwqwx0g0002upxlgxff9012',
    name: '三菱UFJフィナンシャル・グループ',
    stockCode: '8306',
    sector: Sector.FINANCE,
    marketSection: MarketSection.PRIME,
    description:
      '日本最大の金融グループ。銀行、信託、証券、カード、リースなど総合的な金融サービスを提供。',
  },
  {
    id: 'cltwqwx0g0003upxlgxff3456',
    name: 'ファーストリテイリング',
    stockCode: '9983',
    sector: Sector.RETAIL,
    marketSection: MarketSection.PRIME,
    description: 'ユニクロを中心とするアパレル製造小売業。グローバルなSPAビジネスを展開。',
  },
  {
    id: 'cltwqwx0g0004upxlgxff7890',
    name: '日本電信電話',
    stockCode: '9432',
    sector: Sector.INFORMATION_TECH,
    marketSection: MarketSection.PRIME,
    description:
      '日本最大の通信事業者。ICTソリューションやデジタルトランスフォーメーション事業を展開。',
  },
] as const;

async function main() {
  const isRemote = process.argv.includes('--remote');
  const flag = isRemote ? '--remote' : '--local';
  console.log(`Start seeding to ${isRemote ? 'remote' : 'local'} database...`);

  try {
    // 全てのINSERT文を配列として組み立てる
    const insertStatements = brands.map(
      (brand) => `
      INSERT INTO brands (id, name, stockCode, sector, marketSection, description, createdAt, updatedAt)
      VALUES (
        '${brand.id}',
        '${brand.name}',
        '${brand.stockCode}',
        '${brand.sector}',
        '${brand.marketSection}',
        '${brand.description}',
        DATETIME('now'),
        DATETIME('now')
      )
      ON CONFLICT(stockCode) DO UPDATE SET
        name = '${brand.name}',
        sector = '${brand.sector}',
        marketSection = '${brand.marketSection}',
        description = '${brand.description}',
        updatedAt = DATETIME('now');
    `
    );

    // 全てのINSERT文を結合
    const sql = insertStatements.join('\n');

    // 1回のコマンドで全てのINSERT文を実行
    const command = `bunx wrangler d1 execute honox-asset-portfolio ${flag} --command "${sql.replace(/\n/g, ' ')}"`;

    try {
      const { stdout, stderr } = await exec(command);
      if (stderr) {
        console.error('Warning:', stderr);
      }
      console.log('✓ Upserted all brands successfully');
      if (stdout) {
        console.log(stdout);
      }
    } catch (error) {
      console.error('✗ Error upserting brands:', error);
      throw error;
    }

    console.log('Seeding finished successfully.');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
