/**
 * Executive Data Types - CFO and C-Suite Data Models
 */

export interface FinancialMetrics {
  period: string;
  revenue: number;
  operatingExpenses: number;
  netIncome: number;
  costToIncomeRatio: number;
  netInterestMargin: number;
  returnOnEquity: number;
  returnOnAssets: number;
  capitalAdequacyRatio: number;
}

export interface BranchPerformance {
  branchId: string;
  branchName: string;
  region: string;
  revenue: number;
  expenses: number;
  profit: number;
  customerCount: number;
  staffCount: number;
  nps: number;
  costToIncomeRatio: number;
  yoyGrowth: number;
}

export interface CompetitorData {
  name: string;
  marketShare: number;
  costToIncomeRatio: number;
  nps: number;
  digitalAdoption: number;
  revenue: number;
}

export interface KPI {
  id: string;
  name: string;
  value: number;
  target: number;
  previousPeriod: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'on-track' | 'at-risk' | 'behind';
}

export interface BudgetVariance {
  category: string;
  budgeted: number;
  actual: number;
  variance: number;
  variancePercent: number;
  explanation?: string;
}

export interface ScenarioModel {
  id: string;
  name: string;
  description: string;
  variables: ScenarioVariable[];
  projectedImpact: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface ScenarioVariable {
  name: string;
  currentValue: number;
  projectedValue: number;
  unit: string;
  sensitivity: number; // Impact per unit change
}

export interface RiskMetric {
  category: string;
  exposure: number;
  limit: number;
  utilization: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  alerts: number;
}

export interface QuarterlyResults {
  quarter: string;
  year: number;
  revenue: number;
  expenses: number;
  netIncome: number;
  eps: number;
  dividendPerShare: number;
}
