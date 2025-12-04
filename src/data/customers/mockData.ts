/**
 * Mock Customer Data - Realistic banking data for demos
 */

import type {
  Customer,
  Account,
  Transaction,
  SavingsGoal,
  SpendingInsight,
  FinancialHealthScore,
  TransactionCategory,
} from './types';

// Hero customer for demo - Alex Thompson
export const HERO_CUSTOMER: Customer = {
  id: 'cust-001',
  firstName: 'Alex',
  lastName: 'Thompson',
  email: 'alex.thompson@email.com',
  phone: '+61 412 345 678',
  dateOfBirth: '1988-03-15',
  address: {
    street: '42 Harbour View Road',
    city: 'Sydney',
    state: 'NSW',
    postcode: '2000',
    country: 'Australia',
  },
  memberSince: '2019-06-01',
  segment: 'mass-affluent',
  creditScore: 780,
  totalRelationshipValue: 287500,
};

// Alex's accounts
export const HERO_ACCOUNTS: Account[] = [
  {
    id: 'acc-001',
    customerId: 'cust-001',
    type: 'checking',
    name: 'Everyday Account',
    accountNumber: '1234 5678',
    bsb: '062-000',
    balance: 4532.18,
    availableBalance: 4532.18,
    currency: 'AUD',
    interestRate: 0,
    openedDate: '2019-06-01',
    status: 'active',
  },
  {
    id: 'acc-002',
    customerId: 'cust-001',
    type: 'savings',
    name: 'Goal Saver',
    accountNumber: '1234 5679',
    bsb: '062-000',
    balance: 12847.50,
    availableBalance: 12847.50,
    currency: 'AUD',
    interestRate: 4.5,
    openedDate: '2019-06-15',
    status: 'active',
  },
  {
    id: 'acc-003',
    customerId: 'cust-001',
    type: 'credit-card',
    name: 'Platinum Rewards Card',
    accountNumber: '**** **** **** 4521',
    bsb: '',
    balance: -1523.45,
    availableBalance: 8476.55,
    currency: 'AUD',
    interestRate: 19.99,
    openedDate: '2020-01-15',
    status: 'active',
  },
  {
    id: 'acc-004',
    customerId: 'cust-001',
    type: 'home-loan',
    name: 'Home Loan',
    accountNumber: 'HL-78901234',
    bsb: '',
    balance: -425000,
    availableBalance: 0,
    currency: 'AUD',
    interestRate: 6.24,
    openedDate: '2021-03-01',
    status: 'active',
  },
];

// Generate 6 months of transaction history
function generateTransactions(): Transaction[] {
  const transactions: Transaction[] = [];
  const categories: TransactionCategory[] = [
    'groceries', 'dining', 'entertainment', 'shopping', 'utilities',
    'transport', 'health', 'subscriptions', 'income', 'transfer'
  ];

  const merchants: Record<TransactionCategory, string[]> = {
    groceries: ['Woolworths', 'Coles', 'Aldi', 'IGA', 'Harris Farm'],
    dining: ['Uber Eats', 'Doordash', 'Menulog', 'Local Cafe', 'Restaurant XYZ'],
    entertainment: ['Netflix', 'Spotify', 'Event Cinemas', 'Ticketek', 'Steam'],
    shopping: ['Amazon', 'eBay', 'Kmart', 'Target', 'JB Hi-Fi'],
    utilities: ['AGL Energy', 'Optus', 'Telstra', 'Sydney Water', 'Origin'],
    transport: ['Opal', 'Uber', 'Shell', 'BP', 'Caltex'],
    health: ['Chemist Warehouse', 'Priceline', 'Medicare', 'Medibank', 'Gym'],
    subscriptions: ['Netflix', 'Spotify', 'Adobe', 'Microsoft 365', 'iCloud'],
    income: ['Employer - TechCorp', 'Interest', 'Tax Refund', 'Dividend'],
    transfer: ['Transfer to Savings', 'Transfer from Savings', 'Pay Anyone'],
    education: ['TAFE', 'University', 'Coursera', 'Udemy'],
    travel: ['Qantas', 'Virgin', 'Booking.com', 'Airbnb'],
    insurance: ['NRMA', 'Allianz', 'AAMI'],
    fees: ['Account Fee', 'ATM Fee', 'International Fee'],
    other: ['Miscellaneous'],
  };

  let balance = 4532.18;
  const today = new Date();

  // Generate transactions for the past 180 days
  for (let i = 180; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    // Salary on 15th and last day of month
    if (date.getDate() === 15 || date.getDate() === new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()) {
      const salaryAmount = 4250 + Math.random() * 500;
      balance += salaryAmount;
      transactions.push({
        id: `txn-${transactions.length + 1}`,
        accountId: 'acc-001',
        date: dateStr,
        description: 'Salary - TechCorp Pty Ltd',
        amount: salaryAmount,
        type: 'credit',
        category: 'income',
        merchant: 'TechCorp Pty Ltd',
        reference: `PAY${date.getMonth() + 1}${date.getDate()}`,
        balance,
        status: 'completed',
      });
    }

    // Random daily transactions (2-5 per day)
    const numTransactions = Math.floor(Math.random() * 4) + 2;
    for (let j = 0; j < numTransactions; j++) {
      const category = categories[Math.floor(Math.random() * (categories.length - 2))]; // Exclude income/transfer
      const merchantList = merchants[category];
      const merchant = merchantList[Math.floor(Math.random() * merchantList.length)];

      let amount: number;
      switch (category) {
        case 'groceries':
          amount = 20 + Math.random() * 150;
          break;
        case 'dining':
          amount = 15 + Math.random() * 80;
          break;
        case 'entertainment':
          amount = 10 + Math.random() * 50;
          break;
        case 'shopping':
          amount = 25 + Math.random() * 200;
          break;
        case 'utilities':
          amount = 50 + Math.random() * 150;
          break;
        case 'transport':
          amount = 10 + Math.random() * 100;
          break;
        case 'health':
          amount = 20 + Math.random() * 100;
          break;
        case 'subscriptions':
          amount = 10 + Math.random() * 30;
          break;
        default:
          amount = 20 + Math.random() * 100;
      }

      amount = Math.round(amount * 100) / 100;
      balance -= amount;

      transactions.push({
        id: `txn-${transactions.length + 1}`,
        accountId: 'acc-001',
        date: dateStr,
        description: merchant,
        amount: -amount,
        type: 'debit',
        category,
        merchant,
        balance: Math.round(balance * 100) / 100,
        status: 'completed',
      });
    }

    // Monthly savings transfer (1st of month)
    if (date.getDate() === 1) {
      const savingsAmount = 500 + Math.random() * 200;
      balance -= savingsAmount;
      transactions.push({
        id: `txn-${transactions.length + 1}`,
        accountId: 'acc-001',
        date: dateStr,
        description: 'Transfer to Goal Saver',
        amount: -savingsAmount,
        type: 'debit',
        category: 'transfer',
        reference: 'SAVINGS',
        balance: Math.round(balance * 100) / 100,
        status: 'completed',
      });
    }
  }

  return transactions.reverse(); // Most recent first
}

export const HERO_TRANSACTIONS = generateTransactions();

// Alex's savings goals
export const HERO_SAVINGS_GOALS: SavingsGoal[] = [
  {
    id: 'goal-001',
    customerId: 'cust-001',
    name: 'Emergency Fund',
    targetAmount: 15000,
    currentAmount: 12847.50,
    targetDate: '2025-06-01',
    category: 'emergency',
    status: 'active',
    monthlyContribution: 500,
  },
  {
    id: 'goal-002',
    customerId: 'cust-001',
    name: 'Japan Trip 2025',
    targetAmount: 8000,
    currentAmount: 2400,
    targetDate: '2025-09-01',
    category: 'vacation',
    status: 'active',
    monthlyContribution: 400,
  },
  {
    id: 'goal-003',
    customerId: 'cust-001',
    name: 'New Car Fund',
    targetAmount: 25000,
    currentAmount: 5200,
    targetDate: '2026-12-01',
    category: 'car',
    status: 'active',
    monthlyContribution: 600,
  },
];

// Spending insights for Alex
export const HERO_SPENDING_INSIGHTS: SpendingInsight[] = [
  { category: 'groceries', currentMonth: 680, previousMonth: 620, average3Month: 650, percentChange: 9.7, trend: 'up' },
  { category: 'dining', currentMonth: 420, previousMonth: 380, average3Month: 400, percentChange: 10.5, trend: 'up' },
  { category: 'entertainment', currentMonth: 180, previousMonth: 220, average3Month: 200, percentChange: -18.2, trend: 'down' },
  { category: 'shopping', currentMonth: 350, previousMonth: 450, average3Month: 400, percentChange: -22.2, trend: 'down' },
  { category: 'utilities', currentMonth: 320, previousMonth: 310, average3Month: 315, percentChange: 3.2, trend: 'stable' },
  { category: 'transport', currentMonth: 280, previousMonth: 260, average3Month: 270, percentChange: 7.7, trend: 'up' },
  { category: 'health', currentMonth: 120, previousMonth: 80, average3Month: 100, percentChange: 50, trend: 'up' },
  { category: 'subscriptions', currentMonth: 85, previousMonth: 85, average3Month: 85, percentChange: 0, trend: 'stable' },
];

// Financial health score
export const HERO_FINANCIAL_HEALTH: FinancialHealthScore = {
  overall: 78,
  savings: 82,
  spending: 71,
  debt: 75,
  diversification: 68,
  recommendations: [
    'Great job maintaining your emergency fund! You\'re 86% of the way there.',
    'Consider reducing dining out by 15% to accelerate your Japan trip savings.',
    'Your credit card balance is manageable but try to pay it off monthly to avoid interest.',
    'With your credit score of 780, you may qualify for a better home loan rate.',
  ],
};

// Additional customers for variety
export const CUSTOMERS: Customer[] = [
  HERO_CUSTOMER,
  {
    id: 'cust-002',
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'sarah.chen@email.com',
    phone: '+61 423 456 789',
    dateOfBirth: '1992-07-22',
    address: {
      street: '15 Collins Street',
      city: 'Melbourne',
      state: 'VIC',
      postcode: '3000',
      country: 'Australia',
    },
    memberSince: '2020-02-15',
    segment: 'affluent',
    creditScore: 805,
    totalRelationshipValue: 450000,
  },
  {
    id: 'cust-003',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.wilson@email.com',
    phone: '+61 434 567 890',
    dateOfBirth: '1975-11-08',
    address: {
      street: '88 Queen Street',
      city: 'Brisbane',
      state: 'QLD',
      postcode: '4000',
      country: 'Australia',
    },
    memberSince: '2015-09-01',
    segment: 'high-net-worth',
    creditScore: 820,
    totalRelationshipValue: 1250000,
  },
];

// Export helper to get customer data
export function getCustomerById(id: string): Customer | undefined {
  return CUSTOMERS.find(c => c.id === id);
}

export function getAccountsByCustomerId(customerId: string): Account[] {
  if (customerId === 'cust-001') return HERO_ACCOUNTS;
  return [];
}

export function getTransactionsByAccountId(accountId: string, limit = 50): Transaction[] {
  return HERO_TRANSACTIONS.filter(t => t.accountId === accountId).slice(0, limit);
}

export function getRecentTransactions(customerId: string, limit = 20): Transaction[] {
  if (customerId === 'cust-001') {
    return HERO_TRANSACTIONS.slice(0, limit);
  }
  return [];
}
