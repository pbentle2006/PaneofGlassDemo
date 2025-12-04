/**
 * Customer Data Types - Retail Banking Customer Data Models
 */

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: Address;
  memberSince: string;
  segment: CustomerSegment;
  creditScore: number;
  totalRelationshipValue: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export type CustomerSegment = 'mass' | 'mass-affluent' | 'affluent' | 'high-net-worth';

export interface Account {
  id: string;
  customerId: string;
  type: AccountType;
  name: string;
  accountNumber: string;
  bsb: string;
  balance: number;
  availableBalance: number;
  currency: string;
  interestRate: number;
  openedDate: string;
  status: 'active' | 'dormant' | 'closed';
}

export type AccountType = 'checking' | 'savings' | 'term-deposit' | 'credit-card' | 'home-loan' | 'personal-loan';

export interface Transaction {
  id: string;
  accountId: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category: TransactionCategory;
  merchant?: string;
  reference?: string;
  balance: number;
  status: 'pending' | 'completed' | 'failed';
}

export type TransactionCategory =
  | 'income'
  | 'transfer'
  | 'groceries'
  | 'dining'
  | 'entertainment'
  | 'shopping'
  | 'utilities'
  | 'transport'
  | 'health'
  | 'education'
  | 'travel'
  | 'insurance'
  | 'subscriptions'
  | 'fees'
  | 'other';

export interface SavingsGoal {
  id: string;
  customerId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: 'emergency' | 'vacation' | 'home' | 'car' | 'education' | 'retirement' | 'other';
  status: 'active' | 'completed' | 'paused';
  monthlyContribution: number;
}

export interface LoanApplication {
  id: string;
  customerId: string;
  type: 'home-loan' | 'personal-loan' | 'car-loan' | 'credit-card';
  requestedAmount: number;
  term: number; // months
  purpose: string;
  status: 'draft' | 'submitted' | 'approved' | 'declined' | 'funded';
  preApprovalAmount?: number;
  interestRate?: number;
  monthlyPayment?: number;
  submittedDate?: string;
  decisionDate?: string;
}

export interface SpendingInsight {
  category: TransactionCategory;
  currentMonth: number;
  previousMonth: number;
  average3Month: number;
  percentChange: number;
  trend: 'up' | 'down' | 'stable';
}

export interface FinancialHealthScore {
  overall: number; // 0-100
  savings: number;
  spending: number;
  debt: number;
  diversification: number;
  recommendations: string[];
}
