/**
 * Persona Types - Defines the 4 user personas for the Pane of Glass interface
 */

export type PersonaId = 'customer' | 'cfo' | 'branch-manager' | 'fraud-analyst';

export interface Persona {
  id: PersonaId;
  name: string;
  title: string;
  description: string;
  avatar: string;
  theme: PersonaTheme;
  scenarios: ScenarioId[];
}

export interface PersonaTheme {
  primary: string;
  secondary: string;
  accent: string;
  bgGradient: string;
  icon: string;
}

export type ScenarioId =
  // Customer scenarios (4)
  | 'check-balance'
  | 'dispute-charge'
  | 'apply-loan'
  | 'transfer-money'
  // CFO scenarios (4)
  | 'financial-overview'
  | 'risk-analysis'
  | 'budget-forecast'
  | 'compliance-report'
  // Branch Manager scenarios (4)
  | 'daily-operations'
  | 'staff-performance'
  | 'customer-satisfaction'
  | 'branch-metrics'
  // Fraud Analyst scenarios (4)
  | 'suspicious-activity'
  | 'fraud-patterns'
  | 'case-investigation'
  | 'risk-scoring';

export interface Scenario {
  id: ScenarioId;
  personaId: PersonaId;
  name: string;
  description: string;
  icon: string;
  initialPrompt: string;
  agentType: AgentType;
}

export type AgentType =
  | 'customer-service'
  | 'financial-advisor'
  | 'operations'
  | 'fraud-detection'
  | 'orchestrator';

// Persona definitions
export const PERSONAS: Record<PersonaId, Persona> = {
  'customer': {
    id: 'customer',
    name: 'Alex Thompson',
    title: 'Bank Customer',
    description: 'Everyday banking needs - checking accounts, loans, and support',
    avatar: '/avatars/customer.png',
    theme: {
      primary: '#2563eb',
      secondary: '#3b82f6',
      accent: '#60a5fa',
      bgGradient: 'from-blue-500 to-blue-700',
      icon: 'User'
    },
    scenarios: ['check-balance', 'dispute-charge', 'apply-loan', 'transfer-money']
  },
  'cfo': {
    id: 'cfo',
    name: 'Sarah Chen',
    title: 'Chief Financial Officer',
    description: 'Strategic financial oversight and executive decision-making',
    avatar: '/avatars/cfo.png',
    theme: {
      primary: '#059669',
      secondary: '#10b981',
      accent: '#34d399',
      bgGradient: 'from-emerald-500 to-emerald-700',
      icon: 'TrendingUp'
    },
    scenarios: ['financial-overview', 'risk-analysis', 'budget-forecast', 'compliance-report']
  },
  'branch-manager': {
    id: 'branch-manager',
    name: 'Michael Roberts',
    title: 'Branch Manager',
    description: 'Daily operations, staff management, and customer experience',
    avatar: '/avatars/branch-manager.png',
    theme: {
      primary: '#d97706',
      secondary: '#f59e0b',
      accent: '#fbbf24',
      bgGradient: 'from-amber-500 to-amber-700',
      icon: 'Building2'
    },
    scenarios: ['daily-operations', 'staff-performance', 'customer-satisfaction', 'branch-metrics']
  },
  'fraud-analyst': {
    id: 'fraud-analyst',
    name: 'Jessica Martinez',
    title: 'Senior Fraud Analyst',
    description: 'Fraud detection, investigation, and risk assessment',
    avatar: '/avatars/fraud-analyst.png',
    theme: {
      primary: '#7c3aed',
      secondary: '#8b5cf6',
      accent: '#a78bfa',
      bgGradient: 'from-violet-500 to-violet-700',
      icon: 'Shield'
    },
    scenarios: ['suspicious-activity', 'fraud-patterns', 'case-investigation', 'risk-scoring']
  }
};
