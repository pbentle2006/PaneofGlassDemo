/**
 * Agent Types - Defines the specialized agents and orchestration system
 */

import type { AgentType, PersonaId, ScenarioId } from './personas';

export interface Agent {
  id: string;
  type: AgentType;
  name: string;
  description: string;
  systemPrompt: string;
  capabilities: string[];
  tools: AgentTool[];
}

export interface AgentTool {
  name: string;
  description: string;
  parameters: Record<string, ToolParameter>;
}

export interface ToolParameter {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description: string;
  required: boolean;
  enum?: string[];
}

export interface AgentContext {
  personaId: PersonaId;
  scenarioId: ScenarioId;
  sessionId: string;
  conversationHistory: Message[];
  metadata: Record<string, unknown>;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  agentType?: AgentType;
  metadata?: MessageMetadata;
}

export interface MessageMetadata {
  toolCalls?: ToolCall[];
  sentiment?: 'positive' | 'neutral' | 'negative';
  intent?: string;
  confidence?: number;
  handoff?: AgentHandoff;
}

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
  result?: unknown;
  status: 'pending' | 'success' | 'error';
}

export interface AgentHandoff {
  fromAgent: AgentType;
  toAgent: AgentType;
  reason: string;
  context: Record<string, unknown>;
}

export interface AgentResponse {
  message: string;
  agentType: AgentType;
  toolCalls?: ToolCall[];
  suggestedActions?: SuggestedAction[];
  handoff?: AgentHandoff;
}

export interface SuggestedAction {
  id: string;
  label: string;
  action: string;
  icon?: string;
}

// Routing decision from orchestrator
export interface RoutingDecision {
  targetAgent: AgentType;
  confidence: number;
  reasoning: string;
  context: Record<string, unknown>;
}

// Session state for persistence
export interface SessionState {
  id: string;
  personaId: PersonaId;
  activeScenario: ScenarioId | null;
  currentAgent: AgentType;
  messages: Message[];
  context: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}
