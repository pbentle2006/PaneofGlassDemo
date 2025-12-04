/**
 * Branch Manager Data Types - Operations and Sales Intelligence
 */

export interface Branch {
  id: string;
  name: string;
  address: string;
  region: string;
  manager: string;
  staffCount: number;
  openingHours: string;
  services: string[];
}

export interface StaffMember {
  id: string;
  branchId: string;
  firstName: string;
  lastName: string;
  role: StaffRole;
  hireDate: string;
  salesTarget: number;
  salesActual: number;
  nps: number;
  conversionRate: number;
  averageHandleTime: number;
  skills: string[];
}

export type StaffRole = 'teller' | 'personal-banker' | 'loan-officer' | 'branch-manager' | 'assistant-manager';

export interface SalesOpportunity {
  id: string;
  customerId: string;
  customerName: string;
  product: string;
  propensityScore: number;
  estimatedValue: number;
  lifeEvent?: string;
  lastContact?: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
  assignedTo?: string;
  talkingPoints: string[];
}

export interface BranchMetrics {
  date: string;
  footTraffic: number;
  averageWaitTime: number;
  transactionsProcessed: number;
  appointmentsScheduled: number;
  appointmentsCompleted: number;
  salesApplications: number;
  salesApproved: number;
  customerSatisfaction: number;
}

export interface TeamPerformance {
  period: string;
  totalSales: number;
  salesTarget: number;
  newAccounts: number;
  loansOriginated: number;
  crossSellRatio: number;
  averageNps: number;
  topPerformer: string;
  improvementAreas: string[];
}

export interface CustomerOpportunity {
  customerId: string;
  customerName: string;
  currentProducts: string[];
  recommendedProducts: string[];
  propensityScore: number;
  lifetimeValue: number;
  lastInteraction: string;
  lifeEvents: LifeEvent[];
  riskOfChurn: number;
}

export interface LifeEvent {
  type: 'home-purchase' | 'marriage' | 'baby' | 'retirement' | 'job-change' | 'inheritance';
  detectedDate: string;
  confidence: number;
  relevantProducts: string[];
}

export interface InvestmentScenario {
  id: string;
  name: string;
  description: string;
  cost: number;
  expectedReturn: number;
  paybackPeriod: number;
  riskLevel: 'low' | 'medium' | 'high';
  metrics: {
    customerSatisfaction: number;
    staffEfficiency: number;
    salesGrowth: number;
  };
}
