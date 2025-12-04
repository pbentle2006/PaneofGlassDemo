/**
 * Fraud Analyst Data Types - Fraud Detection and Investigation
 */

export interface FraudAlert {
  id: string;
  timestamp: string;
  customerId: string;
  customerName: string;
  accountId: string;
  alertType: AlertType;
  riskScore: number;
  amount: number;
  merchant?: string;
  location?: string;
  description: string;
  status: AlertStatus;
  assignedTo?: string;
  indicators: string[];
  mlConfidence: number;
}

export type AlertType =
  | 'account-takeover'
  | 'card-fraud'
  | 'identity-theft'
  | 'money-laundering'
  | 'business-email-compromise'
  | 'synthetic-identity'
  | 'first-party-fraud'
  | 'friendly-fraud';

export type AlertStatus = 'new' | 'investigating' | 'escalated' | 'resolved-fraud' | 'resolved-false-positive';

export interface FraudCase {
  id: string;
  createdDate: string;
  alerts: string[];
  customerId: string;
  customerName: string;
  caseType: AlertType;
  totalExposure: number;
  status: CaseStatus;
  priority: 'critical' | 'high' | 'medium' | 'low';
  assignedTo: string;
  timeline: CaseEvent[];
  evidence: Evidence[];
  linkedAccounts: LinkedAccount[];
  sarFiled: boolean;
  sarDate?: string;
  resolution?: string;
}

export type CaseStatus = 'open' | 'investigating' | 'pending-review' | 'escalated' | 'closed';

export interface CaseEvent {
  timestamp: string;
  type: 'alert' | 'action' | 'note' | 'escalation' | 'resolution';
  description: string;
  user: string;
}

export interface Evidence {
  id: string;
  type: 'transaction' | 'document' | 'communication' | 'device' | 'location';
  description: string;
  timestamp: string;
  riskIndicator: boolean;
}

export interface LinkedAccount {
  accountId: string;
  accountHolder: string;
  relationship: 'direct' | 'beneficiary' | 'mule-suspect' | 'co-conspirator';
  transactionCount: number;
  totalValue: number;
}

export interface ThreatIntelligence {
  id: string;
  threatGroup: string;
  attackPattern: string;
  targetedProducts: string[];
  indicators: string[];
  severity: 'critical' | 'high' | 'medium' | 'low';
  firstSeen: string;
  lastActivity: string;
  affectedInstitutions: number;
  recommendedActions: string[];
}

export interface PortfolioRisk {
  segment: string;
  accountCount: number;
  atRiskCount: number;
  riskPercentage: number;
  totalExposure: number;
  avgRiskScore: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  topVulnerabilities: string[];
}

export interface FraudMetrics {
  period: string;
  totalAlerts: number;
  confirmedFraud: number;
  falsePositives: number;
  falsePositiveRate: number;
  avgResolutionTime: number;
  totalLossPrevented: number;
  totalLoss: number;
  recoveryRate: number;
}

export interface MuleNetwork {
  id: string;
  name: string;
  accountCount: number;
  totalFlow: number;
  avgTransactionSize: number;
  operatingPeriod: string;
  status: 'active' | 'dormant' | 'disrupted';
  accounts: MuleAccount[];
}

export interface MuleAccount {
  accountId: string;
  accountHolder: string;
  openedDate: string;
  inboundFlow: number;
  outboundFlow: number;
  transactionCount: number;
  riskScore: number;
}
