/**
 * Mock Branch Manager Data - Operations and Sales Intelligence
 */

import type {
  Branch,
  StaffMember,
  SalesOpportunity,
  BranchMetrics,
  TeamPerformance,
  CustomerOpportunity,
  InvestmentScenario,
} from './types';

// Hero Branch - Chatswood
export const HERO_BRANCH: Branch = {
  id: 'BR006',
  name: 'Chatswood',
  address: '345 Victoria Avenue, Chatswood NSW 2067',
  region: 'NSW Metro',
  manager: 'Michael Roberts',
  staffCount: 22,
  openingHours: 'Mon-Fri 9:30am-4:00pm, Sat 9:00am-12:00pm',
  services: ['Personal Banking', 'Business Banking', 'Home Loans', 'Financial Planning', 'Insurance'],
};

// Staff Members
export const BRANCH_STAFF: StaffMember[] = [
  {
    id: 'staff-001',
    branchId: 'BR006',
    firstName: 'Michael',
    lastName: 'Roberts',
    role: 'branch-manager',
    hireDate: '2018-03-15',
    salesTarget: 850000,
    salesActual: 782000,
    nps: 44,
    conversionRate: 0.38,
    averageHandleTime: 0,
    skills: ['Leadership', 'Strategic Planning', 'Compliance', 'Team Development'],
  },
  {
    id: 'staff-002',
    branchId: 'BR006',
    firstName: 'James',
    lastName: 'Chen',
    role: 'loan-officer',
    hireDate: '2020-06-01',
    salesTarget: 320000,
    salesActual: 385000,
    nps: 48,
    conversionRate: 0.42,
    averageHandleTime: 45,
    skills: ['Home Loans', 'Credit Analysis', 'Customer Relations', 'Product Knowledge'],
  },
  {
    id: 'staff-003',
    branchId: 'BR006',
    firstName: 'Sarah',
    lastName: 'Mitchell',
    role: 'personal-banker',
    hireDate: '2021-02-15',
    salesTarget: 180000,
    salesActual: 165000,
    nps: 42,
    conversionRate: 0.35,
    averageHandleTime: 32,
    skills: ['Savings Products', 'Investment Basics', 'Customer Service'],
  },
  {
    id: 'staff-004',
    branchId: 'BR006',
    firstName: 'Peter',
    lastName: 'Wong',
    role: 'personal-banker',
    hireDate: '2019-08-20',
    salesTarget: 180000,
    salesActual: 142000,
    nps: 36,
    conversionRate: 0.28,
    averageHandleTime: 38,
    skills: ['Term Deposits', 'Foreign Exchange', 'Mandarin Speaking'],
  },
  {
    id: 'staff-005',
    branchId: 'BR006',
    firstName: 'Amy',
    lastName: 'Patel',
    role: 'teller',
    hireDate: '2022-11-01',
    salesTarget: 45000,
    salesActual: 52000,
    nps: 45,
    conversionRate: 0.22,
    averageHandleTime: 8,
    skills: ['Cash Handling', 'Transaction Processing', 'Customer Service', 'Hindi Speaking'],
  },
  {
    id: 'staff-006',
    branchId: 'BR006',
    firstName: 'David',
    lastName: 'Kim',
    role: 'assistant-manager',
    hireDate: '2019-04-10',
    salesTarget: 280000,
    salesActual: 268000,
    nps: 41,
    conversionRate: 0.36,
    averageHandleTime: 28,
    skills: ['Operations', 'Compliance', 'Staff Training', 'Korean Speaking'],
  },
];

// Hot Sales Opportunities
export const SALES_OPPORTUNITIES: SalesOpportunity[] = [
  {
    id: 'opp-001',
    customerId: 'cust-101',
    customerName: 'Jennifer Liu',
    product: 'Home Loan',
    propensityScore: 92,
    estimatedValue: 850000,
    lifeEvent: 'Property Search Detected',
    lastContact: '2024-11-28',
    status: 'qualified',
    assignedTo: 'staff-002',
    talkingPoints: [
      'Recently viewed 3 properties in Chatswood area ($800K-$950K range)',
      'Pre-approval could strengthen negotiating position',
      'Current savings pattern suggests ~$180K deposit available',
      'Eligible for first home buyer benefits',
    ],
  },
  {
    id: 'opp-002',
    customerId: 'cust-102',
    customerName: 'Robert & Maria Santos',
    product: 'Investment Property Loan',
    propensityScore: 87,
    estimatedValue: 650000,
    lifeEvent: 'Large deposit + Property searches',
    status: 'new',
    talkingPoints: [
      'Received $120K inheritance 2 months ago',
      'Searching investment properties in Western Sydney',
      'Strong rental yield focus based on search patterns',
      'May benefit from our investor bundle (loan + landlord insurance)',
    ],
  },
  {
    id: 'opp-003',
    customerId: 'cust-103',
    customerName: 'William Chang',
    product: 'Business Banking Package',
    propensityScore: 85,
    estimatedValue: 180000,
    lifeEvent: 'Business Registration Detected',
    status: 'new',
    talkingPoints: [
      'Just registered new IT consulting business',
      'High income earner ($185K salary)',
      'May need business account, card, and equipment finance',
      'Cross-sell opportunity: business insurance referral',
    ],
  },
  {
    id: 'opp-004',
    customerId: 'cust-104',
    customerName: 'Emma & Jack Taylor',
    product: 'Home Loan Refinance',
    propensityScore: 82,
    estimatedValue: 520000,
    lifeEvent: 'Rate comparison searches',
    status: 'contacted',
    assignedTo: 'staff-002',
    talkingPoints: [
      'Current loan with competitor at 6.8%',
      'Our rate 6.24% = $3,600/year savings',
      'Fixed rate options available if concerned about rises',
      '15 years remaining - potential for $54K total savings',
    ],
  },
  {
    id: 'opp-005',
    customerId: 'cust-105',
    customerName: 'Michael Nguyen',
    product: 'Car Loan',
    propensityScore: 78,
    estimatedValue: 45000,
    lifeEvent: 'Car dealership visits',
    lastContact: '2024-11-15',
    status: 'proposal',
    assignedTo: 'staff-003',
    talkingPoints: [
      'Pre-approved for $50K vehicle finance',
      'Strong credit history (score 795)',
      'Looking at Tesla Model 3 and Hyundai Ioniq',
      'Green vehicle discount available (0.5% off)',
    ],
  },
];

// Weekly Branch Metrics (last 8 weeks)
export const BRANCH_METRICS: BranchMetrics[] = [
  { date: '2024-10-14', footTraffic: 342, averageWaitTime: 4.2, transactionsProcessed: 856, appointmentsScheduled: 45, appointmentsCompleted: 41, salesApplications: 28, salesApproved: 22, customerSatisfaction: 4.5 },
  { date: '2024-10-21', footTraffic: 358, averageWaitTime: 4.5, transactionsProcessed: 892, appointmentsScheduled: 52, appointmentsCompleted: 47, salesApplications: 31, salesApproved: 24, customerSatisfaction: 4.4 },
  { date: '2024-10-28', footTraffic: 325, averageWaitTime: 3.8, transactionsProcessed: 821, appointmentsScheduled: 48, appointmentsCompleted: 44, salesApplications: 26, salesApproved: 21, customerSatisfaction: 4.6 },
  { date: '2024-11-04', footTraffic: 368, averageWaitTime: 5.1, transactionsProcessed: 915, appointmentsScheduled: 55, appointmentsCompleted: 48, salesApplications: 35, salesApproved: 27, customerSatisfaction: 4.3 },
  { date: '2024-11-11', footTraffic: 385, averageWaitTime: 5.4, transactionsProcessed: 948, appointmentsScheduled: 58, appointmentsCompleted: 52, salesApplications: 38, salesApproved: 30, customerSatisfaction: 4.2 },
  { date: '2024-11-18', footTraffic: 352, averageWaitTime: 4.2, transactionsProcessed: 878, appointmentsScheduled: 50, appointmentsCompleted: 46, salesApplications: 32, salesApproved: 26, customerSatisfaction: 4.5 },
  { date: '2024-11-25', footTraffic: 318, averageWaitTime: 3.5, transactionsProcessed: 795, appointmentsScheduled: 42, appointmentsCompleted: 40, salesApplications: 24, salesApproved: 20, customerSatisfaction: 4.7 },
  { date: '2024-12-02', footTraffic: 372, averageWaitTime: 4.8, transactionsProcessed: 925, appointmentsScheduled: 54, appointmentsCompleted: 49, salesApplications: 36, salesApproved: 28, customerSatisfaction: 4.4 },
];

// Team Performance Summary
export const TEAM_PERFORMANCE: TeamPerformance = {
  period: '2024-Q4',
  totalSales: 1794000,
  salesTarget: 1853000,
  newAccounts: 245,
  loansOriginated: 52,
  crossSellRatio: 2.4,
  averageNps: 43,
  topPerformer: 'James Chen',
  improvementAreas: [
    'Peter Wong needs coaching on consultative selling techniques',
    'Wait times spike on Monday mornings - consider staggered start times',
    'Cross-sell ratio below target - refresh product bundle training',
  ],
};

// Customer Opportunities
export const CUSTOMER_OPPORTUNITIES: CustomerOpportunity[] = [
  {
    customerId: 'cust-201',
    customerName: 'Dr. Susan Park',
    currentProducts: ['Everyday Account', 'Savings Account'],
    recommendedProducts: ['Medical Professional Home Loan', 'Income Protection Insurance'],
    propensityScore: 88,
    lifetimeValue: 125000,
    lastInteraction: '2024-11-28',
    lifeEvents: [
      { type: 'home-purchase', detectedDate: '2024-11-15', confidence: 0.85, relevantProducts: ['Home Loan', 'Home Insurance'] },
    ],
    riskOfChurn: 12,
  },
  {
    customerId: 'cust-202',
    customerName: 'Thomas & Lisa Brown',
    currentProducts: ['Home Loan', 'Joint Account', 'Credit Card'],
    recommendedProducts: ['Investment Account', 'Life Insurance'],
    propensityScore: 75,
    lifetimeValue: 85000,
    lastInteraction: '2024-11-20',
    lifeEvents: [
      { type: 'baby', detectedDate: '2024-10-05', confidence: 0.92, relevantProducts: ['Life Insurance', 'Education Savings'] },
    ],
    riskOfChurn: 8,
  },
];

// Investment Scenarios
export const INVESTMENT_SCENARIOS: InvestmentScenario[] = [
  {
    id: 'inv-001',
    name: 'Digital Queue Management System',
    description: 'Replace manual queue with digital ticketing and appointment system',
    cost: 45000,
    expectedReturn: 78000,
    paybackPeriod: 8,
    riskLevel: 'low',
    metrics: {
      customerSatisfaction: 15,
      staffEfficiency: 20,
      salesGrowth: 8,
    },
  },
  {
    id: 'inv-002',
    name: 'Video Banking Pod',
    description: 'Install video banking pod for extended hours specialist access',
    cost: 85000,
    expectedReturn: 142000,
    paybackPeriod: 14,
    riskLevel: 'medium',
    metrics: {
      customerSatisfaction: 18,
      staffEfficiency: 12,
      salesGrowth: 15,
    },
  },
  {
    id: 'inv-003',
    name: 'Staff Training Program',
    description: 'Comprehensive sales and service excellence program',
    cost: 28000,
    expectedReturn: 95000,
    paybackPeriod: 6,
    riskLevel: 'low',
    metrics: {
      customerSatisfaction: 12,
      staffEfficiency: 8,
      salesGrowth: 22,
    },
  },
];

// Helper functions
export function getStaffByRole(role: string): StaffMember[] {
  return BRANCH_STAFF.filter(s => s.role === role);
}

export function getTopPerformers(limit = 3): StaffMember[] {
  return [...BRANCH_STAFF]
    .sort((a, b) => (b.salesActual / b.salesTarget) - (a.salesActual / a.salesTarget))
    .slice(0, limit);
}

export function getUnderperformers(): StaffMember[] {
  return BRANCH_STAFF.filter(s => s.salesActual / s.salesTarget < 0.85);
}

export function getHotLeads(minScore = 80): SalesOpportunity[] {
  return SALES_OPPORTUNITIES.filter(o => o.propensityScore >= minScore);
}

export function getWeeklyTrend(): { metric: string; change: number; trend: 'up' | 'down' | 'stable' }[] {
  const current = BRANCH_METRICS[BRANCH_METRICS.length - 1];
  const previous = BRANCH_METRICS[BRANCH_METRICS.length - 2];

  return [
    { metric: 'Foot Traffic', change: ((current.footTraffic - previous.footTraffic) / previous.footTraffic) * 100, trend: current.footTraffic > previous.footTraffic ? 'up' : 'down' },
    { metric: 'Wait Time', change: ((current.averageWaitTime - previous.averageWaitTime) / previous.averageWaitTime) * 100, trend: current.averageWaitTime < previous.averageWaitTime ? 'up' : 'down' },
    { metric: 'Sales Applications', change: ((current.salesApplications - previous.salesApplications) / previous.salesApplications) * 100, trend: current.salesApplications > previous.salesApplications ? 'up' : 'down' },
    { metric: 'Customer Satisfaction', change: ((current.customerSatisfaction - previous.customerSatisfaction) / previous.customerSatisfaction) * 100, trend: current.customerSatisfaction > previous.customerSatisfaction ? 'up' : 'down' },
  ];
}
