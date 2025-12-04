/**
 * Mock Fraud Analyst Data - Fraud Detection and Investigation
 */

import type {
  FraudAlert,
  FraudCase,
  ThreatIntelligence,
  PortfolioRisk,
  FraudMetrics,
  MuleNetwork,
} from './types';

// Today's Fraud Alerts (183 total, showing prioritized subset)
export const FRAUD_ALERTS: FraudAlert[] = [
  {
    id: 'alert-001',
    timestamp: '2024-12-04T08:23:15Z',
    customerId: 'cust-501',
    customerName: 'Patricia Wong',
    accountId: 'acc-501',
    alertType: 'account-takeover',
    riskScore: 94,
    amount: 15000,
    merchant: 'Wire Transfer - International',
    location: 'Lagos, Nigeria',
    description: 'Unusual wire transfer to new international beneficiary. Device fingerprint mismatch. Velocity breach.',
    status: 'new',
    indicators: ['New device', 'New beneficiary', 'International transfer', 'Velocity breach', 'Unusual amount'],
    mlConfidence: 0.96,
  },
  {
    id: 'alert-002',
    timestamp: '2024-12-04T09:45:22Z',
    customerId: 'cust-502',
    customerName: 'Green Solutions Pty Ltd',
    accountId: 'acc-502',
    alertType: 'business-email-compromise',
    riskScore: 91,
    amount: 287000,
    merchant: 'Wire Transfer - Domestic',
    description: 'Large payment to new supplier. Invoice received via email with changed bank details. Classic BEC pattern.',
    status: 'investigating',
    assignedTo: 'Kevin Patel',
    indicators: ['New beneficiary', 'Invoice modification suspected', 'Email domain spoofing', 'Urgency language'],
    mlConfidence: 0.94,
  },
  {
    id: 'alert-003',
    timestamp: '2024-12-04T10:12:45Z',
    customerId: 'cust-503',
    customerName: 'Sam\'s Electronics',
    accountId: 'acc-503',
    alertType: 'card-fraud',
    riskScore: 88,
    amount: 45600,
    merchant: 'Multiple Online Merchants',
    description: 'Merchant account showing unusual chargeback pattern. 47 chargebacks in 72 hours across multiple issuing banks.',
    status: 'new',
    indicators: ['Chargeback spike', 'Multiple issuing banks', 'Cross-border transactions', 'New customer complaints'],
    mlConfidence: 0.91,
  },
  {
    id: 'alert-004',
    timestamp: '2024-12-04T07:15:33Z',
    customerId: 'cust-504',
    customerName: 'David Chen',
    accountId: 'acc-504',
    alertType: 'card-fraud',
    riskScore: 72,
    amount: 2340,
    merchant: 'Apple Store Online',
    location: 'San Francisco, USA',
    description: 'High-value purchase from new device in foreign location. Customer typically transacts locally.',
    status: 'new',
    indicators: ['Foreign transaction', 'High value', 'New device', 'Electronics merchant'],
    mlConfidence: 0.78,
  },
  {
    id: 'alert-005',
    timestamp: '2024-12-04T11:30:00Z',
    customerId: 'cust-505',
    customerName: 'Jennifer Liu',
    accountId: 'acc-505',
    alertType: 'identity-theft',
    riskScore: 85,
    amount: 50000,
    description: 'Credit application with mismatched identity elements. Phone number linked to 3 other recent applications.',
    status: 'new',
    indicators: ['Phone number reuse', 'Address mismatch', 'Recent credit inquiries', 'Synthetic ID markers'],
    mlConfidence: 0.89,
  },
];

// Generate additional alerts to reach 183 total
function generateAdditionalAlerts(): FraudAlert[] {
  const alerts: FraudAlert[] = [...FRAUD_ALERTS];
  const alertTypes: FraudAlert['alertType'][] = [
    'card-fraud', 'card-fraud', 'card-fraud', 'account-takeover',
    'identity-theft', 'money-laundering', 'friendly-fraud'
  ];

  for (let i = 6; i <= 183; i++) {
    const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const riskScore = Math.floor(Math.random() * 50) + 30; // 30-79 range for lower priority

    alerts.push({
      id: `alert-${String(i).padStart(3, '0')}`,
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      customerId: `cust-${500 + i}`,
      customerName: `Customer ${i}`,
      accountId: `acc-${500 + i}`,
      alertType,
      riskScore,
      amount: Math.floor(Math.random() * 5000) + 100,
      description: `Automated alert - ${alertType} pattern detected`,
      status: 'new',
      indicators: ['Automated detection'],
      mlConfidence: Math.random() * 0.3 + 0.5,
    });
  }

  return alerts;
}

export const ALL_FRAUD_ALERTS = generateAdditionalAlerts();

// Priority categorization
export function getAlertsByPriority(): { critical: FraudAlert[]; high: FraudAlert[]; medium: FraudAlert[]; low: FraudAlert[] } {
  return {
    critical: ALL_FRAUD_ALERTS.filter(a => a.riskScore >= 90),
    high: ALL_FRAUD_ALERTS.filter(a => a.riskScore >= 75 && a.riskScore < 90),
    medium: ALL_FRAUD_ALERTS.filter(a => a.riskScore >= 50 && a.riskScore < 75),
    low: ALL_FRAUD_ALERTS.filter(a => a.riskScore < 50),
  };
}

// Active Fraud Cases
export const FRAUD_CASES: FraudCase[] = [
  {
    id: 'case-001',
    createdDate: '2024-12-04',
    alerts: ['alert-002'],
    customerId: 'cust-502',
    customerName: 'Green Solutions Pty Ltd',
    caseType: 'business-email-compromise',
    totalExposure: 287000,
    status: 'investigating',
    priority: 'critical',
    assignedTo: 'Kevin Patel',
    timeline: [
      { timestamp: '2024-12-04T09:45:22Z', type: 'alert', description: 'BEC alert triggered by ML model', user: 'System' },
      { timestamp: '2024-12-04T09:52:00Z', type: 'action', description: 'Payment held pending review', user: 'System' },
      { timestamp: '2024-12-04T10:05:00Z', type: 'action', description: 'Case assigned for investigation', user: 'Kevin Patel' },
      { timestamp: '2024-12-04T10:30:00Z', type: 'note', description: 'Contacted customer - confirmed invoice received via email', user: 'Kevin Patel' },
      { timestamp: '2024-12-04T11:15:00Z', type: 'note', description: 'Email header analysis shows domain spoofing (greenso1utions.com vs greensolutions.com)', user: 'Kevin Patel' },
    ],
    evidence: [
      { id: 'ev-001', type: 'communication', description: 'Spoofed email with modified bank details', timestamp: '2024-12-03T14:22:00Z', riskIndicator: true },
      { id: 'ev-002', type: 'document', description: 'Original invoice from genuine supplier', timestamp: '2024-11-28T09:00:00Z', riskIndicator: false },
      { id: 'ev-003', type: 'document', description: 'Modified invoice with fraudulent bank details', timestamp: '2024-12-03T14:22:00Z', riskIndicator: true },
      { id: 'ev-004', type: 'transaction', description: 'Previous payments to genuine supplier account', timestamp: '2024-10-15T00:00:00Z', riskIndicator: false },
    ],
    linkedAccounts: [
      { accountId: 'mule-001', accountHolder: 'TechSupply Holdings', relationship: 'mule-suspect', transactionCount: 1, totalValue: 287000 },
    ],
    sarFiled: false,
  },
  {
    id: 'case-002',
    createdDate: '2024-12-01',
    alerts: ['alert-prev-001', 'alert-prev-002', 'alert-prev-003'],
    customerId: 'cust-601',
    customerName: 'Global Trading Network',
    caseType: 'money-laundering',
    totalExposure: 1250000,
    status: 'escalated',
    priority: 'critical',
    assignedTo: 'Senior Investigator',
    timeline: [
      { timestamp: '2024-12-01T08:00:00Z', type: 'alert', description: 'Structuring pattern detected', user: 'System' },
      { timestamp: '2024-12-01T10:00:00Z', type: 'escalation', description: 'Escalated to AML team', user: 'Kevin Patel' },
      { timestamp: '2024-12-02T14:00:00Z', type: 'note', description: 'Network analysis reveals 12 connected accounts', user: 'Senior Investigator' },
    ],
    evidence: [],
    linkedAccounts: [
      { accountId: 'linked-001', accountHolder: 'Shell Corp A', relationship: 'mule-suspect', transactionCount: 45, totalValue: 450000 },
      { accountId: 'linked-002', accountHolder: 'Shell Corp B', relationship: 'mule-suspect', transactionCount: 38, totalValue: 380000 },
      { accountId: 'linked-003', accountHolder: 'Individual X', relationship: 'co-conspirator', transactionCount: 52, totalValue: 420000 },
    ],
    sarFiled: true,
    sarDate: '2024-12-03',
  },
];

// Threat Intelligence
export const THREAT_INTELLIGENCE: ThreatIntelligence[] = [
  {
    id: 'threat-001',
    threatGroup: 'Silent Librarian',
    attackPattern: 'Business Email Compromise targeting AU/NZ construction sector',
    targetedProducts: ['Business Banking', 'Wire Transfers'],
    indicators: ['Domain spoofing', 'Invoice modification', 'Urgency language', 'C-suite impersonation'],
    severity: 'high',
    firstSeen: '2024-09-15',
    lastActivity: '2024-12-03',
    affectedInstitutions: 8,
    recommendedActions: [
      'Increase monitoring on construction sector business accounts',
      'Implement callback verification for wire transfers >$50K',
      'Deploy email spoofing detection rules',
      'Customer awareness campaign for business clients',
    ],
  },
  {
    id: 'threat-002',
    threatGroup: 'Scattered Spider',
    attackPattern: 'SIM swap and account takeover targeting high-value retail customers',
    targetedProducts: ['Mobile Banking', 'High-Value Accounts'],
    indicators: ['SIM change requests', 'Password resets', 'New device registration', 'Rapid fund movement'],
    severity: 'critical',
    firstSeen: '2024-10-01',
    lastActivity: '2024-12-04',
    affectedInstitutions: 12,
    recommendedActions: [
      'Implement additional verification for SIM change + password reset combination',
      'Velocity limits on new device registrations',
      'Real-time alerts to customers on security changes',
      'Coordinate with telco partners on SIM swap verification',
    ],
  },
  {
    id: 'threat-003',
    threatGroup: 'Synthetic Identity Ring',
    attackPattern: 'Synthetic identity fraud for credit products',
    targetedProducts: ['Credit Cards', 'Personal Loans', 'Buy Now Pay Later'],
    indicators: ['New credit file', 'Phone number reuse', 'Address clustering', 'Authorized user abuse'],
    severity: 'high',
    firstSeen: '2024-07-01',
    lastActivity: '2024-12-02',
    affectedInstitutions: 15,
    recommendedActions: [
      'Enhanced identity verification for thin-file applicants',
      'Cross-reference phone numbers across applications',
      'Implement device fingerprinting at application',
      'Collaborate with credit bureaus on synthetic ID detection',
    ],
  },
];

// Portfolio Risk Assessment
export const PORTFOLIO_RISK: PortfolioRisk[] = [
  {
    segment: 'Business Banking - Construction',
    accountCount: 2450,
    atRiskCount: 47,
    riskPercentage: 1.92,
    totalExposure: 12500000,
    avgRiskScore: 68,
    trend: 'increasing',
    topVulnerabilities: ['BEC attacks', 'Invoice fraud', 'Supplier impersonation'],
  },
  {
    segment: 'High Net Worth Retail',
    accountCount: 8500,
    atRiskCount: 125,
    riskPercentage: 1.47,
    totalExposure: 8200000,
    avgRiskScore: 62,
    trend: 'stable',
    topVulnerabilities: ['Account takeover', 'SIM swap', 'Authorized push payment fraud'],
  },
  {
    segment: 'Business Banking - Professional Services',
    accountCount: 5200,
    atRiskCount: 38,
    riskPercentage: 0.73,
    totalExposure: 4500000,
    avgRiskScore: 55,
    trend: 'decreasing',
    topVulnerabilities: ['Wire fraud', 'Payroll diversion', 'Vendor impersonation'],
  },
  {
    segment: 'Mass Retail - Credit Cards',
    accountCount: 285000,
    atRiskCount: 1850,
    riskPercentage: 0.65,
    totalExposure: 2800000,
    avgRiskScore: 48,
    trend: 'stable',
    topVulnerabilities: ['Card-not-present fraud', 'Lost/stolen cards', 'Friendly fraud'],
  },
];

// Fraud Metrics (monthly)
export const FRAUD_METRICS: FraudMetrics[] = [
  { period: '2024-07', totalAlerts: 4250, confirmedFraud: 185, falsePositives: 3820, falsePositiveRate: 89.9, avgResolutionTime: 4.2, totalLossPrevented: 2850000, totalLoss: 420000, recoveryRate: 45 },
  { period: '2024-08', totalAlerts: 4580, confirmedFraud: 210, falsePositives: 4105, falsePositiveRate: 89.6, avgResolutionTime: 3.8, totalLossPrevented: 3200000, totalLoss: 380000, recoveryRate: 48 },
  { period: '2024-09', totalAlerts: 4120, confirmedFraud: 168, falsePositives: 3712, falsePositiveRate: 90.1, avgResolutionTime: 3.5, totalLossPrevented: 2650000, totalLoss: 350000, recoveryRate: 52 },
  { period: '2024-10', totalAlerts: 4850, confirmedFraud: 245, falsePositives: 4320, falsePositiveRate: 89.1, avgResolutionTime: 4.0, totalLossPrevented: 4100000, totalLoss: 520000, recoveryRate: 46 },
  { period: '2024-11', totalAlerts: 5200, confirmedFraud: 278, falsePositives: 4612, falsePositiveRate: 88.7, avgResolutionTime: 3.2, totalLossPrevented: 4850000, totalLoss: 480000, recoveryRate: 51 },
];

// Mule Network
export const MULE_NETWORKS: MuleNetwork[] = [
  {
    id: 'network-001',
    name: 'Metro Sydney Ring',
    accountCount: 12,
    totalFlow: 1850000,
    avgTransactionSize: 8500,
    operatingPeriod: '6 months',
    status: 'active',
    accounts: [
      { accountId: 'mule-n1-001', accountHolder: 'John Smith', openedDate: '2024-06-15', inboundFlow: 185000, outboundFlow: 182000, transactionCount: 24, riskScore: 92 },
      { accountId: 'mule-n1-002', accountHolder: 'ABC Services', openedDate: '2024-07-01', inboundFlow: 320000, outboundFlow: 315000, transactionCount: 38, riskScore: 88 },
      { accountId: 'mule-n1-003', accountHolder: 'Mary Johnson', openedDate: '2024-06-20', inboundFlow: 145000, outboundFlow: 142000, transactionCount: 18, riskScore: 85 },
    ],
  },
];

// Helper functions
export function getCriticalAlerts(): FraudAlert[] {
  return ALL_FRAUD_ALERTS.filter(a => a.riskScore >= 85).slice(0, 10);
}

export function getAlertsByType(type: FraudAlert['alertType']): FraudAlert[] {
  return ALL_FRAUD_ALERTS.filter(a => a.alertType === type);
}

export function getFraudTrend(): { period: string; prevented: number; loss: number }[] {
  return FRAUD_METRICS.map(m => ({
    period: m.period,
    prevented: m.totalLossPrevented,
    loss: m.totalLoss,
  }));
}

export function getQ1Forecast(): {
  expectedAlerts: number;
  estimatedLoss: number;
  recommendedActions: string[];
} {
  // Based on trends, project Q1 2025
  return {
    expectedAlerts: 16500,
    estimatedLoss: 1450000,
    recommendedActions: [
      'Deploy enhanced BEC detection model (est. 35% improvement)',
      'Implement real-time device fingerprinting',
      'Increase staffing for investigation team by 2 FTE',
      'Launch customer education campaign for business clients',
      'Partner with telcos on SIM swap verification protocol',
    ],
  };
}
