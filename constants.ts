import { ChartDataPoint, InputRow, KPIItem, PnLRow } from "./types";

export const KPIS: KPIItem[] = [
  { label: 'Net Revenue', value: '$142.5M', variance: 4.2, trend: 'up' },
  { label: 'Volume (Unit Cases)', value: '8.4M', variance: 1.8, trend: 'up' },
  { label: 'Gross Margin', value: '38.2%', variance: -0.5, trend: 'down' },
  { label: 'Operating Expenses', value: '$41.2M', variance: -2.1, trend: 'down' }, // Negative variance in OpEx is usually good, but here we signify over budget
];

export const REVENUE_TREND_DATA: ChartDataPoint[] = [
  { month: 'Jan', actual: 12.1, budget: 11.5, variance: 5.2 },
  { month: 'Feb', actual: 11.8, budget: 11.2, variance: 5.3 },
  { month: 'Mar', actual: 12.5, budget: 12.0, variance: 4.1 },
  { month: 'Apr', actual: 13.2, budget: 12.8, variance: 3.1 },
  { month: 'May', actual: 14.1, budget: 13.5, variance: 4.4 },
  { month: 'Jun', actual: 15.8, budget: 15.0, variance: 5.3 },
  { month: 'Jul', actual: 16.2, budget: 16.5, variance: -1.8 },
  { month: 'Aug', actual: 15.9, budget: 16.0, variance: -0.6 },
  { month: 'Sep', actual: 14.5, budget: 14.0, variance: 3.5 },
  { month: 'Oct', actual: 13.8, budget: 13.2, variance: 4.5 },
  { month: 'Nov', actual: 12.9, budget: 12.5, variance: 3.2 },
  { month: 'Dec', actual: 14.2, budget: 13.8, variance: 2.9 },
];

export const PNL_SUMMARY: PnLRow[] = [
  { id: '1', category: 'Net Operating Revenue', actual: 166.8, budget: 162.0, variance: 4.8, variancePct: 2.9, indent: 0 },
  { id: '2', category: 'Cost of Goods Sold', actual: -103.1, budget: -98.5, variance: -4.6, variancePct: -4.7, indent: 0 },
  { id: '3', category: 'Gross Profit', actual: 63.7, budget: 63.5, variance: 0.2, variancePct: 0.3, indent: 0 },
  { id: '4', category: 'Operating Expenses', actual: -41.2, budget: -40.0, variance: -1.2, variancePct: -3.0, indent: 0 },
  { id: '5', category: 'D&A', actual: -5.1, budget: -5.0, variance: -0.1, variancePct: -2.0, indent: 1 },
  { id: '6', category: 'S&D', actual: -28.4, budget: -27.5, variance: -0.9, variancePct: -3.3, indent: 1 },
  { id: '7', category: 'Operating Income (EBIT)', actual: 22.5, budget: 23.5, variance: -1.0, variancePct: -4.2, indent: 0 },
];

export const INITIAL_INPUT_ROWS: InputRow[] = [
  {
    id: 'r1', account: 'Net Revenue', level: 0, isTotal: true,
    values: {0: 12100, 1: 11800, 2: 12500, 3: 13200, 4: 14100, 5: 15800, 6: 16200, 7: 15900, 8: 14500, 9: 13800, 10: 12900, 11: 14200}
  },
  {
    id: 'r2', account: 'Sparkling Soft Drinks', level: 1,
    values: {0: 8500, 1: 8200, 2: 8800, 3: 9200, 4: 9800, 5: 11000, 6: 11500, 7: 11200, 8: 10100, 9: 9600, 10: 9000, 11: 9900}
  },
  {
    id: 'r3', account: 'Coca-Cola', level: 2,
    values: {0: 5000, 1: 4800, 2: 5200, 3: 5400, 4: 5800, 5: 6500, 6: 6800, 7: 6600, 8: 6000, 9: 5700, 10: 5300, 11: 5900}
  },
  {
    id: 'r4', account: 'Sprite', level: 2,
    values: {0: 2000, 1: 1900, 2: 2100, 3: 2200, 4: 2300, 5: 2600, 6: 2800, 7: 2700, 8: 2400, 9: 2200, 10: 2100, 11: 2300}
  },
  {
    id: 'r5', account: 'Fanta', level: 2,
    values: {0: 1500, 1: 1500, 2: 1500, 3: 1600, 4: 1700, 5: 1900, 6: 1900, 7: 1900, 8: 1700, 9: 1700, 10: 1600, 11: 1700}
  },
  {
    id: 'r6', account: 'Still Beverages', level: 1,
    values: {0: 3600, 1: 3600, 2: 3700, 3: 4000, 4: 4300, 5: 4800, 6: 4700, 7: 4700, 8: 4400, 9: 4200, 10: 3900, 11: 4300}
  },
  {
    id: 'r7', account: 'Water', level: 2,
    values: {0: 1200, 1: 1200, 2: 1300, 3: 1400, 4: 1500, 5: 1800, 6: 1800, 7: 1800, 8: 1600, 9: 1500, 10: 1300, 11: 1400}
  },
  {
    id: 'r8', account: 'Tea', level: 2,
    values: {0: 2400, 1: 2400, 2: 2400, 3: 2600, 4: 2800, 5: 3000, 6: 2900, 7: 2900, 8: 2800, 9: 2700, 10: 2600, 11: 2900}
  },
];