export type Page = 'dashboard' | 'input' | 'reports' | 'integration';

export type Scenario = 'Budget' | 'Actuals';
export type Market = 'Hong Kong' | 'Taiwan' | 'USA' | 'Mainland China';
export type Year = '2024' | '2025' | '2026';

export interface AppContextState {
  market: Market;
  year: Year;
  scenario: Scenario;
}

export interface KPIItem {
  label: string;
  value: string;
  variance: number; // Percentage
  trend: 'up' | 'down' | 'neutral';
  unit?: string;
}

export interface ChartDataPoint {
  month: string;
  actual: number;
  budget: number;
  variance: number;
}

export interface PnLRow {
  id: string;
  category: string;
  actual: number;
  budget: number;
  variance: number;
  variancePct: number;
  indent?: number;
}

export interface InputRow {
  id: string;
  account: string;
  level: number;
  isTotal?: boolean;
  values: Record<string, number>; // Key is month index 0-11
}