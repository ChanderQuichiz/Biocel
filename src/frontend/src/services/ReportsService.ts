

export interface TopProduct {
  productId: number;
  name: string;
  imageUrl: string;
  totalSold: number;
  revenue: number;
}

export interface ReportStats {
  monthlyEarnings: number;
  customerCount: number;
  topProducts: TopProduct[];
}

export async function getReportStats(): Promise<ReportStats> {
  const response = await fetch(`http://localhost:8020/reports/stats`);
  return response.json();
}
