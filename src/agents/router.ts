/**
 * Agent Router - Orchestrates routing between specialized agents
 */

import { claudeService } from '../services/claude';
import { AGENT_DEFINITIONS } from './definitions';
import type {
  AgentType,
  AgentContext,
  AgentResponse,
  RoutingDecision,
  PersonaId,
  ScenarioId,
} from '../types';

/**
 * Mapping of personas to their primary agent type
 */
const PERSONA_AGENT_MAP: Record<PersonaId, AgentType> = {
  'customer': 'customer-service',
  'cfo': 'financial-advisor',
  'branch-manager': 'operations',
  'fraud-analyst': 'fraud-detection',
};

/**
 * Scenario to agent type mapping for direct routing
 */
const SCENARIO_AGENT_MAP: Record<ScenarioId, AgentType> = {
  // Customer scenarios
  'check-balance': 'customer-service',
  'dispute-charge': 'customer-service',
  'apply-loan': 'customer-service',
  'transfer-money': 'customer-service',
  // CFO scenarios
  'financial-overview': 'financial-advisor',
  'risk-analysis': 'financial-advisor',
  'budget-forecast': 'financial-advisor',
  'compliance-report': 'financial-advisor',
  // Branch Manager scenarios
  'daily-operations': 'operations',
  'staff-performance': 'operations',
  'customer-satisfaction': 'operations',
  'branch-metrics': 'operations',
  // Fraud Analyst scenarios
  'suspicious-activity': 'fraud-detection',
  'fraud-patterns': 'fraud-detection',
  'case-investigation': 'fraud-detection',
  'risk-scoring': 'fraud-detection',
};

class AgentRouter {
  private currentAgent: AgentType = 'orchestrator';
  private routingHistory: RoutingDecision[] = [];

  /**
   * Route a message to the appropriate agent
   */
  async route(
    context: AgentContext,
    userMessage: string
  ): Promise<AgentResponse> {
    // Determine target agent
    const routingDecision = await this.determineTargetAgent(context, userMessage);
    this.routingHistory.push(routingDecision);

    // Get the appropriate agent definition
    const agent = AGENT_DEFINITIONS[routingDecision.targetAgent];

    // If Claude service is not configured, return a simulated response
    if (!claudeService.isConfigured()) {
      return this.simulateAgentResponse(routingDecision.targetAgent, userMessage, context);
    }

    // Process request with the target agent
    try {
      const response = await claudeService.processAgentRequest(
        context,
        userMessage,
        agent.systemPrompt
      );

      return {
        ...response,
        agentType: routingDecision.targetAgent,
      };
    } catch (error) {
      console.error('Agent routing error:', error);
      return this.simulateAgentResponse(routingDecision.targetAgent, userMessage, context);
    }
  }

  /**
   * Determine which agent should handle the request
   */
  private async determineTargetAgent(
    context: AgentContext,
    userMessage: string
  ): Promise<RoutingDecision> {
    // First, check if we have a specific scenario
    if (context.scenarioId && SCENARIO_AGENT_MAP[context.scenarioId]) {
      return {
        targetAgent: SCENARIO_AGENT_MAP[context.scenarioId],
        confidence: 1.0,
        reasoning: `Direct routing based on scenario: ${context.scenarioId}`,
        context: { scenario: context.scenarioId },
      };
    }

    // Fall back to persona-based routing
    if (context.personaId && PERSONA_AGENT_MAP[context.personaId]) {
      return {
        targetAgent: PERSONA_AGENT_MAP[context.personaId],
        confidence: 0.9,
        reasoning: `Routing based on persona: ${context.personaId}`,
        context: { persona: context.personaId },
      };
    }

    // Use intent-based routing as fallback
    return this.classifyIntent(userMessage);
  }

  /**
   * Classify intent based on message content
   */
  private classifyIntent(message: string): RoutingDecision {
    const lowerMessage = message.toLowerCase();

    // Fraud-related keywords
    if (
      lowerMessage.includes('fraud') ||
      lowerMessage.includes('suspicious') ||
      lowerMessage.includes('unauthorized') ||
      lowerMessage.includes('investigate') ||
      lowerMessage.includes('alert')
    ) {
      return {
        targetAgent: 'fraud-detection',
        confidence: 0.85,
        reasoning: 'Fraud-related keywords detected',
        context: { keywords: ['fraud', 'suspicious', 'unauthorized'] },
      };
    }

    // Financial/Executive keywords
    if (
      lowerMessage.includes('forecast') ||
      lowerMessage.includes('budget') ||
      lowerMessage.includes('risk analysis') ||
      lowerMessage.includes('compliance') ||
      lowerMessage.includes('quarterly') ||
      lowerMessage.includes('strategic')
    ) {
      return {
        targetAgent: 'financial-advisor',
        confidence: 0.85,
        reasoning: 'Executive/financial keywords detected',
        context: { keywords: ['forecast', 'budget', 'compliance'] },
      };
    }

    // Operations keywords
    if (
      lowerMessage.includes('staff') ||
      lowerMessage.includes('schedule') ||
      lowerMessage.includes('branch') ||
      lowerMessage.includes('operations') ||
      lowerMessage.includes('performance')
    ) {
      return {
        targetAgent: 'operations',
        confidence: 0.85,
        reasoning: 'Operations-related keywords detected',
        context: { keywords: ['staff', 'branch', 'operations'] },
      };
    }

    // Default to customer service
    return {
      targetAgent: 'customer-service',
      confidence: 0.7,
      reasoning: 'Default routing to customer service',
      context: {},
    };
  }

  /**
   * Generate a simulated response when API is not available
   */
  private simulateAgentResponse(
    agentType: AgentType,
    userMessage: string,
    _context: AgentContext
  ): AgentResponse {
    // Agent definition available for future use
    void AGENT_DEFINITIONS[agentType];
    const simulatedResponses: Record<AgentType, string> = {
      'orchestrator': 'I\'m analyzing your request and routing it to the appropriate specialist.',
      'customer-service': `Hello! I'm here to help with your banking needs. I can see you're asking about "${userMessage.substring(0, 50)}...". Let me look into that for you.\n\n**Your Account Summary:**\n- Checking: $4,532.18\n- Savings: $12,847.50\n- Credit Available: $8,500.00\n\nHow can I assist you further?`,
      'financial-advisor': `Good morning. I've analyzed your query regarding "${userMessage.substring(0, 50)}...".\n\n**Key Financial Metrics (Q4 2024):**\n- Revenue: $142.3M (+8.2% YoY)\n- Operating Margin: 28.4%\n- Risk-Adjusted Return: 12.7%\n\nWould you like me to drill down into any specific area?`,
      'operations': `I've reviewed the operational data related to your request.\n\n**Today's Branch Status:**\n- Staff on duty: 12/14 scheduled\n- Customer wait time: 4.2 min (avg)\n- Transactions processed: 847\n- Customer satisfaction: 4.6/5.0\n\nWhat specific aspect would you like to explore?`,
      'fraud-detection': `Alert reviewed. I've analyzed the suspicious activity patterns.\n\n**Current Alert Summary:**\n- High Priority: 3 cases\n- Medium Priority: 12 cases\n- Under Investigation: 8 cases\n\n**Risk Score Analysis:**\nThe flagged transaction shows anomalous behavior with a risk score of 78/100.\n\nShall I provide detailed analysis on any specific case?`,
    };

    return {
      message: simulatedResponses[agentType] || 'I\'m processing your request...',
      agentType,
      suggestedActions: this.getSuggestedActions(agentType),
    };
  }

  /**
   * Get suggested follow-up actions based on agent type
   */
  private getSuggestedActions(agentType: AgentType) {
    const actions: Record<AgentType, Array<{ id: string; label: string; action: string; icon?: string }>> = {
      'orchestrator': [],
      'customer-service': [
        { id: '1', label: 'View Transactions', action: 'show_transactions', icon: 'List' },
        { id: '2', label: 'Transfer Money', action: 'transfer', icon: 'ArrowRightLeft' },
        { id: '3', label: 'Pay Bills', action: 'pay_bills', icon: 'Receipt' },
      ],
      'financial-advisor': [
        { id: '1', label: 'View Full Report', action: 'full_report', icon: 'FileText' },
        { id: '2', label: 'Risk Analysis', action: 'risk_analysis', icon: 'AlertTriangle' },
        { id: '3', label: 'Export Data', action: 'export', icon: 'Download' },
      ],
      'operations': [
        { id: '1', label: 'Staff Schedule', action: 'schedule', icon: 'Calendar' },
        { id: '2', label: 'Performance Metrics', action: 'metrics', icon: 'BarChart' },
        { id: '3', label: 'Customer Feedback', action: 'feedback', icon: 'MessageSquare' },
      ],
      'fraud-detection': [
        { id: '1', label: 'View All Alerts', action: 'alerts', icon: 'Bell' },
        { id: '2', label: 'Case Details', action: 'case_details', icon: 'FileSearch' },
        { id: '3', label: 'Generate SAR', action: 'generate_sar', icon: 'FileWarning' },
      ],
    };

    return actions[agentType] || [];
  }

  /**
   * Get the current agent type
   */
  getCurrentAgent(): AgentType {
    return this.currentAgent;
  }

  /**
   * Get routing history for debugging
   */
  getRoutingHistory(): RoutingDecision[] {
    return [...this.routingHistory];
  }

  /**
   * Clear routing history
   */
  clearHistory(): void {
    this.routingHistory = [];
  }
}

// Export singleton instance
export const agentRouter = new AgentRouter();

// Export class for testing
export { AgentRouter };
