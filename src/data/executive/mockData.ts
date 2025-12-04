/**
 * Mock Executive Data - CFO Dashboard and Analytics Data
 */

import type {
  FinancialMetrics,
  BranchPerformance,
  CompetitorData,
  KPI,
  BudgetVariance,
  ScenarioModel,
  RiskMetric,
  QuarterlyResults,
} from './types';

// Key Performance Indicators
export const EXECUTIVE_KPIS: KPI[] = [
  {
    id: 'cti',
    name: 'Cost-to-Income Ratio',
    value: 52.3,
    target: 50.0,
    previousPeriod: 54.1,
    unit: '%',
    trend: 'down',
    status: 'at-risk',
  },
  {
    id: 'roe',
    name: 'Return on Equity',
    value: 11.2,
    target: 12.0,
    previousPeriod: 10.8,
    unit: '%',
    trend: 'up',
    status: 'at-risk',
  },
  {
    id: 'nim',
    name: 'Net Interest Margin',
    value: 1.89,
    target: 2.00,
    previousPeriod: 1.95,
    unit: '%',
    trend: 'down',
    status: 'behind',
  },
  {
    id: 'car',
    name: 'Capital Adequacy Ratio',
    value: 13.5,
    target: 12.5,
    previousPeriod: 13.2,
    unit: '%',
    trend: 'up',
    status: 'on-track',
  },
  {
    id: 'nps',
    name: 'Net Promoter Score',
    value: 32,
    target: 40,
    previousPeriod: 28,
    unit: 'pts',
    trend: 'up',
    status: 'at-risk',
  },
  {
    id: 'digital',
    name: 'Digital Adoption Rate',
    value: 67,
    target: 75,
    previousPeriod: 62,
    unit: '%',
    trend: 'up',
    status: 'at-risk',
  },
];

// Quarterly Financial Results (2 years)
export const QUARTERLY_RESULTS: QuarterlyResults[] = [
  { quarter: 'Q1', year: 2023, revenue: 2850, expenses: 1520, netIncome: 890, eps: 1.12, dividendPerShare: 0.45 },
  { quarter: 'Q2', year: 2023, revenue: 2920, expenses: 1580, netIncome: 910, eps: 1.15, dividendPerShare: 0.45 },
  { quarter: 'Q3', year: 2023, revenue: 2780, expenses: 1490, netIncome: 850, eps: 1.07, dividendPerShare: 0.45 },
  { quarter: 'Q4', year: 2023, revenue: 3050, expenses: 1620, netIncome: 980, eps: 1.24, dividendPerShare: 0.48 },
  { quarter: 'Q1', year: 2024, revenue: 2980, expenses: 1560, netIncome: 920, eps: 1.16, dividendPerShare: 0.48 },
  { quarter: 'Q2', year: 2024, revenue: 3120, expenses: 1640, netIncome: 1010, eps: 1.27, dividendPerShare: 0.48 },
  { quarter: 'Q3', year: 2024, revenue: 3050, expenses: 1590, netIncome: 970, eps: 1.22, dividendPerShare: 0.50 },
  { quarter: 'Q4', year: 2024, revenue: 3280, expenses: 1720, netIncome: 1080, eps: 1.36, dividendPerShare: 0.52 },
];

// Monthly Financial Metrics (current year)
export const MONTHLY_METRICS: FinancialMetrics[] = [
  { period: '2024-01', revenue: 980, operatingExpenses: 512, netIncome: 298, costToIncomeRatio: 52.2, netInterestMargin: 1.92, returnOnEquity: 10.8, returnOnAssets: 0.89, capitalAdequacyRatio: 13.1 },
  { period: '2024-02', revenue: 1020, operatingExpenses: 528, netIncome: 318, costToIncomeRatio: 51.8, netInterestMargin: 1.94, returnOnEquity: 11.0, returnOnAssets: 0.91, capitalAdequacyRatio: 13.2 },
  { period: '2024-03', revenue: 980, operatingExpenses: 520, netIncome: 304, costToIncomeRatio: 53.1, netInterestMargin: 1.90, returnOnEquity: 10.6, returnOnAssets: 0.88, capitalAdequacyRatio: 13.2 },
  { period: '2024-04', revenue: 1050, operatingExpenses: 545, netIncome: 335, costToIncomeRatio: 51.9, netInterestMargin: 1.91, returnOnEquity: 11.2, returnOnAssets: 0.92, capitalAdequacyRatio: 13.3 },
  { period: '2024-05', revenue: 1040, operatingExpenses: 548, netIncome: 328, costToIncomeRatio: 52.7, netInterestMargin: 1.89, returnOnEquity: 11.0, returnOnAssets: 0.90, capitalAdequacyRatio: 13.3 },
  { period: '2024-06', revenue: 1030, operatingExpenses: 547, netIncome: 347, costToIncomeRatio: 53.1, netInterestMargin: 1.88, returnOnEquity: 11.4, returnOnAssets: 0.93, capitalAdequacyRatio: 13.4 },
  { period: '2024-07', revenue: 1000, operatingExpenses: 530, netIncome: 310, costToIncomeRatio: 53.0, netInterestMargin: 1.87, returnOnEquity: 10.8, returnOnAssets: 0.88, capitalAdequacyRatio: 13.4 },
  { period: '2024-08', revenue: 1020, operatingExpenses: 535, netIncome: 325, costToIncomeRatio: 52.5, netInterestMargin: 1.88, returnOnEquity: 11.0, returnOnAssets: 0.90, capitalAdequacyRatio: 13.5 },
  { period: '2024-09', revenue: 1030, operatingExpenses: 525, netIncome: 335, costToIncomeRatio: 51.0, netInterestMargin: 1.90, returnOnEquity: 11.4, returnOnAssets: 0.92, capitalAdequacyRatio: 13.5 },
  { period: '2024-10', revenue: 1080, operatingExpenses: 565, netIncome: 355, costToIncomeRatio: 52.3, netInterestMargin: 1.91, returnOnEquity: 11.6, returnOnAssets: 0.94, capitalAdequacyRatio: 13.5 },
  { period: '2024-11', revenue: 1100, operatingExpenses: 575, netIncome: 365, costToIncomeRatio: 52.3, netInterestMargin: 1.89, returnOnEquity: 11.8, returnOnAssets: 0.95, capitalAdequacyRatio: 13.5 },
  { period: '2024-12', revenue: 1100, operatingExpenses: 580, netIncome: 360, costToIncomeRatio: 52.7, netInterestMargin: 1.88, returnOnEquity: 11.6, returnOnAssets: 0.93, capitalAdequacyRatio: 13.5 },
];

// Competitor Benchmarks (Big 4 Australian Banks)
export const COMPETITORS: CompetitorData[] = [
  { name: 'Commonwealth Bank', marketShare: 26.2, costToIncomeRatio: 44.8, nps: 45, digitalAdoption: 82, revenue: 26500 },
  { name: 'Westpac', marketShare: 22.1, costToIncomeRatio: 51.2, nps: 35, digitalAdoption: 74, revenue: 21800 },
  { name: 'NAB', marketShare: 20.5, costToIncomeRatio: 48.5, nps: 38, digitalAdoption: 71, revenue: 19200 },
  { name: 'ANZ', marketShare: 18.8, costToIncomeRatio: 49.2, nps: 36, digitalAdoption: 69, revenue: 17500 },
  { name: 'Our Bank', marketShare: 12.4, costToIncomeRatio: 52.3, nps: 32, digitalAdoption: 67, revenue: 12400 },
];

// Branch Performance Data
export const BRANCH_PERFORMANCE: BranchPerformance[] = [
  { branchId: 'BR001', branchName: 'Sydney CBD', region: 'NSW Metro', revenue: 42.5, expenses: 21.2, profit: 21.3, customerCount: 12500, staffCount: 28, nps: 42, costToIncomeRatio: 49.9, yoyGrowth: 8.2 },
  { branchId: 'BR002', branchName: 'Melbourne Central', region: 'VIC Metro', revenue: 38.2, expenses: 19.8, profit: 18.4, customerCount: 11200, staffCount: 25, nps: 38, costToIncomeRatio: 51.8, yoyGrowth: 5.4 },
  { branchId: 'BR003', branchName: 'Brisbane Queen St', region: 'QLD Metro', revenue: 28.5, expenses: 15.2, profit: 13.3, customerCount: 8500, staffCount: 20, nps: 35, costToIncomeRatio: 53.3, yoyGrowth: 3.2 },
  { branchId: 'BR004', branchName: 'Perth CBD', region: 'WA Metro', revenue: 22.8, expenses: 12.5, profit: 10.3, customerCount: 6800, staffCount: 16, nps: 40, costToIncomeRatio: 54.8, yoyGrowth: 2.1 },
  { branchId: 'BR005', branchName: 'Adelaide Central', region: 'SA Metro', revenue: 18.2, expenses: 10.2, profit: 8.0, customerCount: 5200, staffCount: 14, nps: 33, costToIncomeRatio: 56.0, yoyGrowth: -1.5 },
  { branchId: 'BR006', branchName: 'Chatswood', region: 'NSW Metro', revenue: 32.5, expenses: 16.8, profit: 15.7, customerCount: 9800, staffCount: 22, nps: 44, costToIncomeRatio: 51.7, yoyGrowth: 6.8 },
  { branchId: 'BR007', branchName: 'Parramatta', region: 'NSW Metro', revenue: 26.8, expenses: 14.5, profit: 12.3, customerCount: 8200, staffCount: 18, nps: 36, costToIncomeRatio: 54.1, yoyGrowth: 4.2 },
  { branchId: 'BR008', branchName: 'Gold Coast', region: 'QLD Regional', revenue: 15.5, expenses: 9.2, profit: 6.3, customerCount: 4800, staffCount: 12, nps: 31, costToIncomeRatio: 59.4, yoyGrowth: -2.8 },
];

// Budget Variance Analysis
export const BUDGET_VARIANCE: BudgetVariance[] = [
  { category: 'Personnel Costs', budgeted: 580, actual: 595, variance: -15, variancePercent: -2.6, explanation: 'Increased overtime due to system migration' },
  { category: 'Technology', budgeted: 180, actual: 195, variance: -15, variancePercent: -8.3, explanation: 'Accelerated cloud migration costs' },
  { category: 'Marketing', budgeted: 85, actual: 72, variance: 13, variancePercent: 15.3, explanation: 'Campaign delays pushed to Q1' },
  { category: 'Occupancy', budgeted: 120, actual: 118, variance: 2, variancePercent: 1.7, explanation: 'On track' },
  { category: 'Professional Services', budgeted: 65, actual: 78, variance: -13, variancePercent: -20.0, explanation: 'Additional consulting for regulatory compliance' },
  { category: 'Other Operating', budgeted: 95, actual: 92, variance: 3, variancePercent: 3.2, explanation: 'Cost controls effective' },
];

// Scenario Models
export const SCENARIO_MODELS: ScenarioModel[] = [
  {
    id: 'rate-rise',
    name: 'Interest Rate Increase',
    description: 'Model impact of RBA rate increases on NIM and loan demand',
    variables: [
      { name: 'Cash Rate', currentValue: 4.35, projectedValue: 4.85, unit: '%', sensitivity: 12.5 },
      { name: 'Mortgage Rate', currentValue: 6.24, projectedValue: 6.74, unit: '%', sensitivity: 8.2 },
      { name: 'Deposit Rate', currentValue: 4.5, projectedValue: 4.75, unit: '%', sensitivity: -5.4 },
    ],
    projectedImpact: 45,
    riskLevel: 'medium',
  },
  {
    id: 'digital-transform',
    name: 'Digital Transformation',
    description: 'Investment in digital capabilities to reduce CTI',
    variables: [
      { name: 'Initial Investment', currentValue: 0, projectedValue: 85, unit: '$M', sensitivity: -1 },
      { name: 'Branch Reduction', currentValue: 120, projectedValue: 95, unit: 'branches', sensitivity: 2.5 },
      { name: 'Digital Adoption', currentValue: 67, projectedValue: 85, unit: '%', sensitivity: 0.8 },
    ],
    projectedImpact: 125,
    riskLevel: 'high',
  },
  {
    id: 'credit-downturn',
    name: 'Credit Quality Downturn',
    description: 'Model impact of increased loan defaults',
    variables: [
      { name: 'Default Rate', currentValue: 0.8, projectedValue: 1.5, unit: '%', sensitivity: -42 },
      { name: 'Provision Ratio', currentValue: 1.2, projectedValue: 1.8, unit: '%', sensitivity: -28 },
      { name: 'Recovery Rate', currentValue: 65, projectedValue: 55, unit: '%', sensitivity: 15 },
    ],
    projectedImpact: -85,
    riskLevel: 'high',
  },
];

// Risk Metrics
export const RISK_METRICS: RiskMetric[] = [
  { category: 'Credit Risk', exposure: 48500, limit: 55000, utilization: 88.2, trend: 'stable', alerts: 3 },
  { category: 'Market Risk', exposure: 2850, limit: 4000, utilization: 71.3, trend: 'increasing', alerts: 1 },
  { category: 'Operational Risk', exposure: 1250, limit: 2000, utilization: 62.5, trend: 'stable', alerts: 5 },
  { category: 'Liquidity Risk', exposure: 8500, limit: 12000, utilization: 70.8, trend: 'decreasing', alerts: 0 },
  { category: 'Compliance Risk', exposure: 450, limit: 800, utilization: 56.3, trend: 'stable', alerts: 2 },
];

// Helper functions
export function getKpiById(id: string): KPI | undefined {
  return EXECUTIVE_KPIS.find(k => k.id === id);
}

export function getMetricsForPeriod(startPeriod: string, endPeriod: string): FinancialMetrics[] {
  return MONTHLY_METRICS.filter(m => m.period >= startPeriod && m.period <= endPeriod);
}

export function getBranchPerformance(region?: string): BranchPerformance[] {
  if (region) {
    return BRANCH_PERFORMANCE.filter(b => b.region === region);
  }
  return BRANCH_PERFORMANCE;
}

export function getUnderperformingBranches(): BranchPerformance[] {
  return BRANCH_PERFORMANCE.filter(b => b.yoyGrowth < 0 || b.costToIncomeRatio > 55);
}
