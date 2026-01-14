/**
 * Persona Types - Defines the 5 user personas for the Westpac interface
 */

export type PersonaId = 'customer' | 'cfo' | 'branch-manager' | 'fraud-analyst' | 'data-steward';

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
  | 'risk-scoring'
  // Data Steward scenarios (4)
  | 'data-quality'
  | 'golden-records'
  | 'entity-resolution'
  | 'data-lineage';

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
  | 'data-steward'
  | 'orchestrator';

// Persona definitions - Westpac Brand Colors
export const PERSONAS: Record<PersonaId, Persona> = {
  'customer': {
    id: 'customer',
    name: 'Alex Thompson',
    title: 'Bank Customer',
    description: 'Everyday banking needs - checking accounts, loans, and support',
    avatar: '/avatars/customer.png',
    theme: {
      primary: '#DA1710',      // Westpac Crimson
      secondary: '#E54545',    // Lighter Crimson
      accent: '#F08080',       // Light Coral
      bgGradient: 'from-[#DA1710] to-[#990000]',
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
      primary: '#1F1C4F',      // Westpac Port Gore (Hero)
      secondary: '#3D3A7A',    // Lighter Port Gore
      accent: '#5C58A6',       // Light Purple
      bgGradient: 'from-[#1F1C4F] to-[#0D0B26]',
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
      primary: '#991AD6',      // Westpac Bright Purple
      secondary: '#B347E6',    // Lighter Purple
      accent: '#CC7AF0',       // Light Purple
      bgGradient: 'from-[#991AD6] to-[#6B0F96]',
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
      primary: '#2A2E42',      // Westpac Neutral Dark
      secondary: '#45495F',    // Lighter Neutral
      accent: '#6B7085',       // Muted
      bgGradient: 'from-[#2A2E42] to-[#181B25]',
      icon: 'Shield'
    },
    scenarios: ['suspicious-activity', 'fraud-patterns', 'case-investigation', 'risk-scoring']
  },
  'data-steward': {
    id: 'data-steward',
    name: 'James Wong',
    title: 'Data Governance Lead',
    description: 'Data quality, golden records, lineage and governance',
    avatar: '/avatars/data-steward.png',
    theme: {
      primary: '#990000',      // Westpac Dark Red
      secondary: '#B33333',    // Lighter Dark Red
      accent: '#CC6666',       // Light Red
      bgGradient: 'from-[#990000] to-[#660000]',
      icon: 'Database'
    },
    scenarios: ['data-quality', 'golden-records', 'entity-resolution', 'data-lineage']
  }
};
