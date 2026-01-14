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

// Import mock data
import {
  HERO_CUSTOMER,
  HERO_ACCOUNTS,
  HERO_TRANSACTIONS,
  HERO_SAVINGS_GOALS,
  HERO_SPENDING_INSIGHTS,
  HERO_FINANCIAL_HEALTH,
} from '../data/customers';

import {
  EXECUTIVE_KPIS,
  COMPETITORS,
  BRANCH_PERFORMANCE,
  BUDGET_VARIANCE,
  SCENARIO_MODELS,
} from '../data/executive';

import {
  HERO_BRANCH,
  BRANCH_STAFF,
  SALES_OPPORTUNITIES,
  BRANCH_METRICS,
  TEAM_PERFORMANCE,
  INVESTMENT_SCENARIOS,
} from '../data/branch';

import {
  FRAUD_ALERTS,
  FRAUD_CASES,
  THREAT_INTELLIGENCE,
  PORTFOLIO_RISK,
  getAlertsByPriority,
} from '../data/fraud';

import {
  MDM_DASHBOARD,
  DATA_SOURCES,
  DATA_QUALITY_METRICS,
  DUPLICATE_CLUSTERS,
  ENTITY_MATCHES,
  DATA_LINEAGE,
  DATA_QUALITY_ISSUES,
  getIssuesBySeverity,
  getDuplicatesByPriority,
} from '../data/masterdata';

/**
 * Mapping of personas to their primary agent type
 */
const PERSONA_AGENT_MAP: Record<PersonaId, AgentType> = {
  'customer': 'customer-service',
  'cfo': 'financial-advisor',
  'branch-manager': 'operations',
  'fraud-analyst': 'fraud-detection',
  'data-steward': 'data-steward',
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
  // Data Steward scenarios
  'data-quality': 'data-steward',
  'golden-records': 'data-steward',
  'entity-resolution': 'data-steward',
  'data-lineage': 'data-steward',
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

    // Data Steward keywords
    if (
      lowerMessage.includes('data quality') ||
      lowerMessage.includes('duplicate') ||
      lowerMessage.includes('golden record') ||
      lowerMessage.includes('lineage') ||
      lowerMessage.includes('master data') ||
      lowerMessage.includes('entity') ||
      lowerMessage.includes('mdm')
    ) {
      return {
        targetAgent: 'data-steward',
        confidence: 0.85,
        reasoning: 'Data governance keywords detected',
        context: { keywords: ['data quality', 'duplicate', 'master data'] },
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
    const lowerMessage = userMessage.toLowerCase();
    let response: string;

    switch (agentType) {
      case 'customer-service':
        response = this.generateCustomerResponse(lowerMessage);
        break;
      case 'financial-advisor':
        response = this.generateCFOResponse(lowerMessage);
        break;
      case 'operations':
        response = this.generateBranchManagerResponse(lowerMessage);
        break;
      case 'fraud-detection':
        response = this.generateFraudAnalystResponse(lowerMessage);
        break;
      case 'data-steward':
        response = this.generateDataStewardResponse(lowerMessage);
        break;
      default:
        response = 'I\'m processing your request...';
    }

    return {
      message: response,
      agentType,
      suggestedActions: this.getSuggestedActions(agentType),
    };
  }

  /**
   * Generate customer service responses using mock data
   */
  private generateCustomerResponse(message: string): string {
    const checking = HERO_ACCOUNTS.find(a => a.type === 'checking');
    const savings = HERO_ACCOUNTS.find(a => a.type === 'savings');
    const creditCard = HERO_ACCOUNTS.find(a => a.type === 'credit-card');
    const homeLoan = HERO_ACCOUNTS.find(a => a.type === 'home-loan');

    // Balance inquiry
    if (message.includes('balance') || message.includes('account')) {
      return `Here's your account summary, ${HERO_CUSTOMER.firstName}:\n\n` +
        `**Everyday Account**\n` +
        `Balance: $${checking?.balance.toLocaleString('en-AU', { minimumFractionDigits: 2 })}\n` +
        `BSB: ${checking?.bsb} | Account: ${checking?.accountNumber}\n\n` +
        `**Goal Saver**\n` +
        `Balance: $${savings?.balance.toLocaleString('en-AU', { minimumFractionDigits: 2 })}\n` +
        `Interest Rate: ${savings?.interestRate}% p.a.\n\n` +
        `**Platinum Rewards Card**\n` +
        `Current Balance: $${Math.abs(creditCard?.balance || 0).toLocaleString('en-AU', { minimumFractionDigits: 2 })}\n` +
        `Available Credit: $${creditCard?.availableBalance.toLocaleString('en-AU', { minimumFractionDigits: 2 })}\n\n` +
        `Is there anything specific you'd like to know about your accounts?`;
    }

    // Transaction history
    if (message.includes('transaction') || message.includes('recent') || message.includes('spending')) {
      const recentTxns = HERO_TRANSACTIONS.slice(0, 10);
      let txnList = recentTxns.map(t =>
        `- ${t.date} | ${t.description} | $${Math.abs(t.amount).toFixed(2)} ${t.type === 'credit' ? '↑' : '↓'}`
      ).join('\n');

      const topCategory = HERO_SPENDING_INSIGHTS.reduce((a, b) => a.currentMonth > b.currentMonth ? a : b);

      return `Here are your recent transactions:\n\n${txnList}\n\n` +
        `**Spending Insight:** Your highest spending category this month is **${topCategory.category}** at $${topCategory.currentMonth}. ` +
        `That's ${topCategory.percentChange > 0 ? 'up' : 'down'} ${Math.abs(topCategory.percentChange)}% from last month.`;
    }

    // Transfer money
    if (message.includes('transfer')) {
      return `I can help you transfer money, ${HERO_CUSTOMER.firstName}.\n\n` +
        `**Your Accounts:**\n` +
        `- Everyday Account: $${checking?.balance.toLocaleString('en-AU', { minimumFractionDigits: 2 })}\n` +
        `- Goal Saver: $${savings?.balance.toLocaleString('en-AU', { minimumFractionDigits: 2 })}\n\n` +
        `**Transfer Options:**\n` +
        `- Between your accounts (instant)\n` +
        `- To saved payees (same day)\n` +
        `- New payee via PayID or BSB\n\n` +
        `How much would you like to transfer and to which account?`;
    }

    // Loan eligibility
    if (message.includes('loan') || message.includes('eligible') || message.includes('car')) {
      const healthScore = HERO_FINANCIAL_HEALTH;
      return `Great question! Let me check your loan eligibility.\n\n` +
        `**Your Financial Profile:**\n` +
        `- Credit Score: ${HERO_CUSTOMER.creditScore} (Excellent)\n` +
        `- Financial Health Score: ${healthScore.overall}/100\n` +
        `- Existing Home Loan: $${Math.abs(homeLoan?.balance || 0).toLocaleString('en-AU')}\n\n` +
        `**Pre-Approved Offers:**\n` +
        `- **Car Loan**: Up to $50,000 at 6.99% p.a.\n` +
        `  - Est. repayment: $967/month over 5 years\n` +
        `- **Personal Loan**: Up to $30,000 at 8.49% p.a.\n\n` +
        `With your excellent credit score, you qualify for our best rates! Would you like to start an application?`;
    }

    // Savings goals
    if (message.includes('goal') || message.includes('saving')) {
      let goalsList = HERO_SAVINGS_GOALS.map(g => {
        const progress = (g.currentAmount / g.targetAmount * 100).toFixed(0);
        return `- **${g.name}**: $${g.currentAmount.toLocaleString('en-AU')} / $${g.targetAmount.toLocaleString('en-AU')} (${progress}%)\n  Contributing: $${g.monthlyContribution}/month`;
      }).join('\n');

      return `Here are your savings goals, ${HERO_CUSTOMER.firstName}:\n\n${goalsList}\n\n` +
        `**Tip:** ${HERO_FINANCIAL_HEALTH.recommendations[0]}`;
    }

    // Default response
    return `Hello ${HERO_CUSTOMER.firstName}! I'm here to help with your banking needs.\n\n` +
      `**Your Account Summary:**\n` +
      `- Everyday: $${checking?.balance.toLocaleString('en-AU', { minimumFractionDigits: 2 })}\n` +
      `- Savings: $${savings?.balance.toLocaleString('en-AU', { minimumFractionDigits: 2 })}\n` +
      `- Credit Available: $${creditCard?.availableBalance.toLocaleString('en-AU', { minimumFractionDigits: 2 })}\n\n` +
      `How can I assist you today?`;
  }

  /**
   * Generate CFO responses using mock data
   */
  private generateCFOResponse(message: string): string {
    // Cost-to-income or CTI
    if (message.includes('cost') || message.includes('cti') || message.includes('income ratio')) {
      const cti = EXECUTIVE_KPIS.find(k => k.id === 'cti');
      const underperforming = BRANCH_PERFORMANCE.filter(b => b.costToIncomeRatio > 55);

      return `**Cost-to-Income Analysis**\n\n` +
        `**Current CTI Ratio: ${cti?.value}%**\n` +
        `- Target: ${cti?.target}%\n` +
        `- Previous Quarter: ${cti?.previousPeriod}%\n` +
        `- Status: ${cti?.status === 'on-track' ? '✅ On Track' : '⚠️ ' + cti?.status}\n\n` +
        `**Branch Analysis:**\n` +
        `${underperforming.length} branches above 55% CTI threshold:\n` +
        underperforming.map(b => `- ${b.branchName}: ${b.costToIncomeRatio}%`).join('\n') +
        `\n\n**Key Drivers:**\n` +
        BUDGET_VARIANCE.filter(v => v.variance < 0).slice(0, 3).map(v =>
          `- ${v.category}: ${v.variancePercent.toFixed(1)}% over budget (${v.explanation})`
        ).join('\n');
    }

    // Competitor comparison
    if (message.includes('cba') || message.includes('competitor') || message.includes('compare') || message.includes('benchmark')) {
      const ourBank = COMPETITORS.find(c => c.name === 'Our Bank');
      const cba = COMPETITORS.find(c => c.name === 'Commonwealth Bank');

      return `**Competitor Benchmarking Analysis**\n\n` +
        `| Metric | Our Bank | CBA | Gap |\n` +
        `|--------|----------|-----|-----|\n` +
        `| Market Share | ${ourBank?.marketShare}% | ${cba?.marketShare}% | -${((cba?.marketShare || 0) - (ourBank?.marketShare || 0)).toFixed(1)}% |\n` +
        `| Cost-to-Income | ${ourBank?.costToIncomeRatio}% | ${cba?.costToIncomeRatio}% | +${((ourBank?.costToIncomeRatio || 0) - (cba?.costToIncomeRatio || 0)).toFixed(1)}% |\n` +
        `| NPS | ${ourBank?.nps} | ${cba?.nps} | -${(cba?.nps || 0) - (ourBank?.nps || 0)} pts |\n` +
        `| Digital Adoption | ${ourBank?.digitalAdoption}% | ${cba?.digitalAdoption}% | -${(cba?.digitalAdoption || 0) - (ourBank?.digitalAdoption || 0)}% |\n\n` +
        `**Key Insight:** CBA's CTI advantage of ${((ourBank?.costToIncomeRatio || 0) - (cba?.costToIncomeRatio || 0)).toFixed(1)}% translates to ~$${(((ourBank?.costToIncomeRatio || 0) - (cba?.costToIncomeRatio || 0)) * 0.01 * (ourBank?.revenue || 0)).toFixed(0)}M in potential annual savings if we match their efficiency.`;
    }

    // Underperforming branches
    if (message.includes('underperform') || message.includes('branch')) {
      const underperforming = BRANCH_PERFORMANCE.filter(b => b.yoyGrowth < 0 || b.costToIncomeRatio > 55);

      return `**Underperforming Branches Analysis**\n\n` +
        `Found ${underperforming.length} branches requiring attention:\n\n` +
        underperforming.map(b =>
          `**${b.branchName}** (${b.region})\n` +
          `- CTI: ${b.costToIncomeRatio}% | YoY Growth: ${b.yoyGrowth > 0 ? '+' : ''}${b.yoyGrowth}%\n` +
          `- NPS: ${b.nps} | Revenue: $${b.revenue}M`
        ).join('\n\n') +
        `\n\n**Recommended Actions:**\n` +
        `1. Review staffing levels at Adelaide Central\n` +
        `2. Investigate Gold Coast traffic decline\n` +
        `3. Consider digital transformation investment`;
    }

    // Scenario modeling / interest rates
    if (message.includes('model') || message.includes('scenario') || message.includes('interest') || message.includes('rate')) {
      const rateScenario = SCENARIO_MODELS.find(s => s.id === 'rate-rise');

      return `**Interest Rate Sensitivity Analysis**\n\n` +
        `**Scenario:** ${rateScenario?.name}\n` +
        `${rateScenario?.description}\n\n` +
        `**Variable Impacts:**\n` +
        rateScenario?.variables.map(v =>
          `- ${v.name}: ${v.currentValue}${v.unit} → ${v.projectedValue}${v.unit}`
        ).join('\n') +
        `\n\n**Projected Impact:** +$${rateScenario?.projectedImpact}M to NII\n` +
        `**Risk Level:** ${rateScenario?.riskLevel}\n\n` +
        `**Key Considerations:**\n` +
        `- Deposit repricing lag may compress margins initially\n` +
        `- Loan demand expected to soften 8-12%\n` +
        `- Fixed rate book provides 6-month hedge`;
    }

    // Default CFO response
    const cti = EXECUTIVE_KPIS.find(k => k.id === 'cti');
    const roe = EXECUTIVE_KPIS.find(k => k.id === 'roe');
    const nim = EXECUTIVE_KPIS.find(k => k.id === 'nim');

    return `**Executive Dashboard Summary**\n\n` +
      `**Key Performance Indicators:**\n` +
      `| Metric | Value | Target | Status |\n` +
      `|--------|-------|--------|--------|\n` +
      `| Cost-to-Income | ${cti?.value}% | ${cti?.target}% | ${cti?.status === 'on-track' ? '✅' : '⚠️'} |\n` +
      `| ROE | ${roe?.value}% | ${roe?.target}% | ${roe?.status === 'on-track' ? '✅' : '⚠️'} |\n` +
      `| NIM | ${nim?.value}% | ${nim?.target}% | ${nim?.status === 'on-track' ? '✅' : '⚠️'} |\n\n` +
      `What specific area would you like me to analyze?`;
  }

  /**
   * Generate Branch Manager responses using mock data
   */
  private generateBranchManagerResponse(message: string): string {
    // Weekly performance
    if (message.includes('week') || message.includes('perform') || message.includes('how did')) {
      const latestMetrics = BRANCH_METRICS[BRANCH_METRICS.length - 1];
      const previousMetrics = BRANCH_METRICS[BRANCH_METRICS.length - 2];

      const changes = {
        traffic: ((latestMetrics.footTraffic - previousMetrics.footTraffic) / previousMetrics.footTraffic * 100).toFixed(1),
        sales: ((latestMetrics.salesApplications - previousMetrics.salesApplications) / previousMetrics.salesApplications * 100).toFixed(1),
        satisfaction: ((latestMetrics.customerSatisfaction - previousMetrics.customerSatisfaction) / previousMetrics.customerSatisfaction * 100).toFixed(1),
      };

      return `**Weekly Performance Report - ${HERO_BRANCH.name}**\n\n` +
        `**This Week (w/e ${latestMetrics.date}):**\n` +
        `- Foot Traffic: ${latestMetrics.footTraffic} visitors (${Number(changes.traffic) > 0 ? '+' : ''}${changes.traffic}%)\n` +
        `- Avg Wait Time: ${latestMetrics.averageWaitTime} mins\n` +
        `- Sales Applications: ${latestMetrics.salesApplications} (${Number(changes.sales) > 0 ? '+' : ''}${changes.sales}%)\n` +
        `- Approved: ${latestMetrics.salesApproved} (${(latestMetrics.salesApproved / latestMetrics.salesApplications * 100).toFixed(0)}% approval rate)\n` +
        `- Customer Satisfaction: ${latestMetrics.customerSatisfaction}/5.0\n\n` +
        `**Team Performance:**\n` +
        `- Target: $${(TEAM_PERFORMANCE.salesTarget / 1000).toFixed(0)}K | Actual: $${(TEAM_PERFORMANCE.totalSales / 1000).toFixed(0)}K\n` +
        `- Top Performer: ${TEAM_PERFORMANCE.topPerformer}\n\n` +
        `**Areas for Focus:**\n` +
        TEAM_PERFORMANCE.improvementAreas.map(a => `- ${a}`).join('\n');
    }

    // Home loans / sales opportunities
    if (message.includes('home loan') || message.includes('call') || message.includes('opportunity') || message.includes('lead')) {
      const homeLoans = SALES_OPPORTUNITIES.filter(o =>
        o.product.toLowerCase().includes('loan') && o.propensityScore >= 80
      );

      return `**High-Value Sales Opportunities**\n\n` +
        `I've identified ${homeLoans.length} hot leads for home loans:\n\n` +
        homeLoans.map(o =>
          `**${o.customerName}** - ${o.product}\n` +
          `- Propensity Score: ${o.propensityScore}%\n` +
          `- Est. Value: $${o.estimatedValue.toLocaleString('en-AU')}\n` +
          `- Life Event: ${o.lifeEvent || 'N/A'}\n` +
          `- Talking Points:\n${o.talkingPoints.map(t => `  • ${t}`).join('\n')}`
        ).join('\n\n') +
        `\n\n**Recommended Action:** Start with Jennifer Liu - highest propensity and actively searching.`;
    }

    // Team / staff performance
    if (message.includes('team') || message.includes('staff') || message.includes('coaching')) {
      const sorted = [...BRANCH_STAFF].sort((a, b) =>
        (b.salesActual / b.salesTarget) - (a.salesActual / a.salesTarget)
      );

      return `**Team Performance Analysis - ${HERO_BRANCH.name}**\n\n` +
        `| Team Member | Role | Target | Actual | % | NPS |\n` +
        `|-------------|------|--------|--------|---|-----|\n` +
        sorted.map(s =>
          `| ${s.firstName} ${s.lastName} | ${s.role} | $${(s.salesTarget / 1000).toFixed(0)}K | $${(s.salesActual / 1000).toFixed(0)}K | ${(s.salesActual / s.salesTarget * 100).toFixed(0)}% | ${s.nps} |`
        ).join('\n') +
        `\n\n**Coaching Recommendations:**\n` +
        `- **${sorted[sorted.length - 1].firstName} ${sorted[sorted.length - 1].lastName}**: Focus on consultative selling. Current conversion rate ${(sorted[sorted.length - 1].conversionRate * 100).toFixed(0)}% vs team avg 35%\n` +
        `- Pair with ${sorted[0].firstName} for peer mentoring on product knowledge`;
    }

    // Investment ROI
    if (message.includes('roi') || message.includes('invest') || message.includes('digital') || message.includes('queue')) {
      return `**Investment ROI Analysis**\n\n` +
        INVESTMENT_SCENARIOS.map(inv =>
          `**${inv.name}**\n` +
          `${inv.description}\n` +
          `- Investment: $${inv.cost.toLocaleString('en-AU')}\n` +
          `- Expected Annual Return: $${inv.expectedReturn.toLocaleString('en-AU')}\n` +
          `- Payback Period: ${inv.paybackPeriod} months\n` +
          `- Risk Level: ${inv.riskLevel}\n` +
          `- Impact: +${inv.metrics.customerSatisfaction}% satisfaction, +${inv.metrics.salesGrowth}% sales`
        ).join('\n\n') +
        `\n\n**Recommendation:** Staff Training Program offers best ROI with lowest risk. Consider bundling with Digital Queue System for compounding benefits.`;
    }

    // Default branch manager response
    return `**${HERO_BRANCH.name} Branch Dashboard**\n\n` +
      `**Today's Status:**\n` +
      `- Staff on Duty: ${BRANCH_STAFF.length}\n` +
      `- Sales Target Progress: ${(TEAM_PERFORMANCE.totalSales / TEAM_PERFORMANCE.salesTarget * 100).toFixed(0)}%\n\n` +
      `**Hot Opportunities:**\n` +
      SALES_OPPORTUNITIES.slice(0, 3).map(o => `- ${o.customerName}: ${o.product} ($${o.estimatedValue.toLocaleString('en-AU')})`).join('\n') +
      `\n\nWhat would you like to focus on?`;
  }

  /**
   * Generate Fraud Analyst responses using mock data
   */
  private generateFraudAnalystResponse(message: string): string {
    const priorities = getAlertsByPriority();

    // Critical alerts
    if (message.includes('critical') || message.includes('priority') || message.includes('alert')) {
      const critical = priorities.critical.slice(0, 5);

      return `**Critical Alert Queue**\n\n` +
        `Found **${priorities.critical.length} critical** and **${priorities.high.length} high priority** alerts.\n\n` +
        `**Top Critical Alerts:**\n\n` +
        critical.map(a =>
          `**Alert ${a.id}** - Risk Score: ${a.riskScore}/100\n` +
          `- Type: ${a.alertType}\n` +
          `- Customer: ${a.customerName}\n` +
          `- Amount: $${a.amount.toLocaleString('en-AU')}\n` +
          `- ${a.description}\n` +
          `- Indicators: ${a.indicators.slice(0, 3).join(', ')}`
        ).join('\n\n') +
        `\n\n**Recommended Action:** Start with Alert alert-001 (Patricia Wong) - highest risk score with multiple velocity breaches.`;
    }

    // BEC case
    if (message.includes('bec') || message.includes('case') || message.includes('green solution') || message.includes('investigate')) {
      const becCase = FRAUD_CASES.find(c => c.caseType === 'business-email-compromise');

      if (becCase) {
        return `**Case Investigation: ${becCase.id}**\n\n` +
          `**Subject:** ${becCase.customerName}\n` +
          `**Type:** Business Email Compromise\n` +
          `**Exposure:** $${becCase.totalExposure.toLocaleString('en-AU')}\n` +
          `**Priority:** ${becCase.priority}\n` +
          `**Status:** ${becCase.status}\n\n` +
          `**Timeline:**\n` +
          becCase.timeline.map(t => `- ${t.timestamp.split('T')[1].substring(0, 5)} - ${t.description}`).join('\n') +
          `\n\n**Evidence Collected:**\n` +
          becCase.evidence.filter(e => e.riskIndicator).map(e => `- ⚠️ ${e.description}`).join('\n') +
          `\n\n**Key Finding:** Email domain spoofing detected (greenso1utions.com vs greensolutions.com). Payment on hold pending customer verification.`;
      }
    }

    // Portfolio risk / segments at risk
    if (message.includes('segment') || message.includes('portfolio') || message.includes('risk') || message.includes('at risk')) {
      return `**Portfolio Risk Assessment**\n\n` +
        `| Segment | Accounts | At Risk | % | Exposure |\n` +
        `|---------|----------|---------|---|----------|\n` +
        PORTFOLIO_RISK.map(p =>
          `| ${p.segment} | ${p.accountCount.toLocaleString()} | ${p.atRiskCount} | ${p.riskPercentage}% | $${(p.totalExposure / 1000000).toFixed(1)}M |`
        ).join('\n') +
        `\n\n**Highest Risk Segment:** Business Banking - Construction\n` +
        `- Trend: ${PORTFOLIO_RISK[0].trend}\n` +
        `- Top Vulnerabilities: ${PORTFOLIO_RISK[0].topVulnerabilities.join(', ')}\n\n` +
        `**Recommended Actions:**\n` +
        `1. Implement enhanced BEC controls for construction sector\n` +
        `2. Deploy callback verification for wire transfers >$50K\n` +
        `3. Customer awareness campaign for business clients`;
    }

    // Threat forecast / Q1
    if (message.includes('threat') || message.includes('q1') || message.includes('forecast') || message.includes('watch')) {
      return `**Q1 2025 Threat Forecast**\n\n` +
        `**Active Threat Groups:**\n\n` +
        THREAT_INTELLIGENCE.map(t =>
          `**${t.threatGroup}** (${t.severity} severity)\n` +
          `- Pattern: ${t.attackPattern}\n` +
          `- Targets: ${t.targetedProducts.join(', ')}\n` +
          `- Last Activity: ${t.lastActivity}\n` +
          `- Affected Institutions: ${t.affectedInstitutions}`
        ).join('\n\n') +
        `\n\n**Q1 Projections:**\n` +
        `- Expected Alerts: ~16,500 (+15% YoY)\n` +
        `- Estimated Loss if Unmitigated: $1.45M\n\n` +
        `**Priority Actions:**\n` +
        THREAT_INTELLIGENCE[0].recommendedActions.slice(0, 3).map((a, i) => `${i + 1}. ${a}`).join('\n');
    }

    // Default fraud analyst response
    return `**Fraud Operations Dashboard**\n\n` +
      `**Today's Alert Summary:**\n` +
      `- Total Alerts: ${FRAUD_ALERTS.length}\n` +
      `- Critical: ${priorities.critical.length}\n` +
      `- High: ${priorities.high.length}\n` +
      `- Medium: ${priorities.medium.length}\n` +
      `- Low: ${priorities.low.length}\n\n` +
      `**Active Cases:** ${FRAUD_CASES.length}\n` +
      `**Open Investigations:** ${FRAUD_CASES.filter(c => c.status === 'investigating').length}\n\n` +
      `What would you like to investigate?`;
  }

  /**
   * Generate Data Steward responses using mock data
   */
  private generateDataStewardResponse(message: string): string {
    const issues = getIssuesBySeverity();
    const duplicates = getDuplicatesByPriority();

    // Data quality dashboard / overview
    if (message.includes('quality') || message.includes('dashboard') || message.includes('overview') || message.includes('metric')) {
      return `**Data Quality Dashboard**\n\n` +
        `**Overall Score: ${MDM_DASHBOARD.dataQualityScore}%**\n\n` +
        `| Dimension | Score | Target | Status |\n` +
        `|-----------|-------|--------|--------|\n` +
        DATA_QUALITY_METRICS.map(m =>
          `| ${m.name} | ${m.score}% | ${m.target}% | ${m.score >= m.target ? '✅' : '⚠️'} ${m.trend === 'up' ? '↑' : m.trend === 'down' ? '↓' : '→'} |`
        ).join('\n') +
        `\n\n**Records Summary:**\n` +
        `- Total Records: ${MDM_DASHBOARD.totalRecords.toLocaleString()}\n` +
        `- Golden Records: ${MDM_DASHBOARD.goldenRecords.toLocaleString()}\n` +
        `- Systems Connected: ${MDM_DASHBOARD.systemsConnected}\n` +
        `- Processed Today: ${MDM_DASHBOARD.recordsProcessedToday.toLocaleString()}\n\n` +
        `**Action Required:**\n` +
        `- ${issues.critical.length} critical issues\n` +
        `- ${MDM_DASHBOARD.pendingDuplicates} pending duplicates`;
    }

    // Duplicates / golden records
    if (message.includes('duplicate') || message.includes('golden') || message.includes('merge')) {
      const highPriority = duplicates.high;

      return `**Duplicate Management Queue**\n\n` +
        `**Pending Duplicates: ${MDM_DASHBOARD.pendingDuplicates}**\n` +
        `- High Priority: ${highPriority.length}\n` +
        `- Medium Priority: ${duplicates.medium.length}\n` +
        `- Low Priority: ${duplicates.low.length}\n\n` +
        `**Top Duplicate Clusters:**\n\n` +
        DUPLICATE_CLUSTERS.slice(0, 3).map(d =>
          `**Cluster ${d.clusterId}** (${d.priority} priority)\n` +
          `- Records: ${d.recordCount} | Match Score: ${d.matchScore}%\n` +
          `- Suggested Action: ${d.suggestedAction === 'auto-merge' ? '🤖 Auto-Merge' : '👤 Manual Review'}\n` +
          `- Names: ${d.records.map(r => r.customerName).join(' | ')}`
        ).join('\n\n') +
        `\n\n**Quick Actions:**\n` +
        `- Auto-merge ${DUPLICATE_CLUSTERS.filter(d => d.suggestedAction === 'auto-merge').length} clusters\n` +
        `- Review ${DUPLICATE_CLUSTERS.filter(d => d.suggestedAction === 'manual-review').length} clusters manually`;
    }

    // Entity resolution
    if (message.includes('entity') || message.includes('match') || message.includes('resolution')) {
      return `**Entity Resolution Queue**\n\n` +
        `**Pending Matches: ${ENTITY_MATCHES.filter(m => m.status === 'pending').length}**\n\n` +
        `| Match ID | Entity 1 | Entity 2 | Score | Type |\n` +
        `|----------|----------|----------|-------|------|\n` +
        ENTITY_MATCHES.map(m =>
          `| ${m.id} | ${m.entity1.name} | ${m.entity2.name} | ${m.matchScore}% | ${m.matchType} |`
        ).join('\n') +
        `\n\n**Match Details:**\n\n` +
        ENTITY_MATCHES.slice(0, 2).map(m =>
          `**${m.id}**\n` +
          `- Matched Fields: ${m.matchedFields.join(', ')}\n` +
          `- Entity 1 IDs: ${Object.entries(m.entity1.identifiers).map(([k, v]) => `${k}: ${v}`).join(', ')}\n` +
          `- Entity 2 IDs: ${Object.entries(m.entity2.identifiers).map(([k, v]) => `${k}: ${v}`).join(', ')}`
        ).join('\n\n') +
        `\n\n**Recommendation:** Review ${ENTITY_MATCHES[0].id} first - highest confidence match.`;
    }

    // Data lineage
    if (message.includes('lineage') || message.includes('source') || message.includes('flow') || message.includes('origin')) {
      const sources = DATA_LINEAGE.filter(n => n.type === 'source');
      const destinations = DATA_LINEAGE.filter(n => n.type === 'destination');
      const hub = DATA_LINEAGE.find(n => n.type === 'transformation');

      return `**Customer Data Lineage**\n\n` +
        `**Data Flow Architecture:**\n\n` +
        `\`\`\`\n` +
        `${sources.map(s => s.name).join(' ─┐\n')} ─┐\n` +
        `                    ├─→ [MDM Hub] ─┬─→ ${destinations.map(d => d.name).join('\n                               ├─→ ')}\n` +
        `\`\`\`\n\n` +
        `**Source Systems:**\n` +
        DATA_SOURCES.map(s =>
          `- **${s.name}** (${s.system}): ${s.recordCount.toLocaleString()} records | Quality: ${s.quality}%`
        ).join('\n') +
        `\n\n**MDM Hub Transformations:**\n` +
        hub?.transformations?.map(t => `- ${t}`).join('\n') +
        `\n\n**Destination Systems:**\n` +
        destinations.map(d => `- ${d.name} (${d.system}) - Owner: ${d.dataOwner}`).join('\n');
    }

    // Data quality issues
    if (message.includes('issue') || message.includes('error') || message.includes('problem')) {
      return `**Data Quality Issues Queue**\n\n` +
        `**Open Issues: ${MDM_DASHBOARD.issuesInQueue}**\n` +
        `- Critical: ${issues.critical.length}\n` +
        `- High: ${issues.high.length}\n` +
        `- Medium: ${issues.medium.length}\n\n` +
        `**Top Issues:**\n\n` +
        DATA_QUALITY_ISSUES.slice(0, 4).map(i =>
          `**${i.id}** - ${i.severity.toUpperCase()}\n` +
          `- Type: ${i.type} | Field: ${i.field}\n` +
          `- Records Affected: ${i.recordCount.toLocaleString()}\n` +
          `- ${i.description}\n` +
          `- Fix: ${i.suggestedFix}\n` +
          `- Status: ${i.status}`
        ).join('\n\n') +
        `\n\n**Quick Actions:**\n` +
        `1. Apply phone number standardization (fixes 12,456 records)\n` +
        `2. Run email enrichment batch job\n` +
        `3. Schedule KYC refresh workflow`;
    }

    // Default data steward response
    return `**Master Data Hub - Welcome, James**\n\n` +
      `**Data Quality Overview:**\n` +
      `- Customer Records: ${MDM_DASHBOARD.totalRecords.toLocaleString()} total\n` +
      `- Golden Records: ${MDM_DASHBOARD.goldenRecords.toLocaleString()}\n` +
      `- Match Rate: ${MDM_DASHBOARD.dataQualityScore}%\n` +
      `- Pending Duplicates: ${MDM_DASHBOARD.pendingDuplicates}\n` +
      `- Issues in Queue: ${MDM_DASHBOARD.issuesInQueue}\n\n` +
      `**Connected Systems:** ${MDM_DASHBOARD.systemsConnected}\n` +
      `**Last Sync:** ${new Date(MDM_DASHBOARD.lastSyncTime).toLocaleTimeString()}\n\n` +
      `I can help you manage golden records, resolve duplicates, track data lineage, and monitor data quality metrics.\n\n` +
      `What would you like to focus on?`;
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
        { id: '3', label: 'Check Loan Eligibility', action: 'loan_check', icon: 'Receipt' },
      ],
      'financial-advisor': [
        { id: '1', label: 'View Full Report', action: 'full_report', icon: 'FileText' },
        { id: '2', label: 'Competitor Analysis', action: 'competitor', icon: 'BarChart' },
        { id: '3', label: 'Scenario Modeling', action: 'scenario', icon: 'TrendingUp' },
      ],
      'operations': [
        { id: '1', label: 'Hot Leads', action: 'leads', icon: 'Users' },
        { id: '2', label: 'Team Performance', action: 'team', icon: 'BarChart' },
        { id: '3', label: 'Investment ROI', action: 'roi', icon: 'DollarSign' },
      ],
      'fraud-detection': [
        { id: '1', label: 'Critical Alerts', action: 'alerts', icon: 'Bell' },
        { id: '2', label: 'Active Cases', action: 'cases', icon: 'FileSearch' },
        { id: '3', label: 'Threat Intel', action: 'threats', icon: 'Shield' },
      ],
      'data-steward': [
        { id: '1', label: 'Data Quality', action: 'quality', icon: 'CheckCircle' },
        { id: '2', label: 'Duplicates', action: 'duplicates', icon: 'Copy' },
        { id: '3', label: 'Data Lineage', action: 'lineage', icon: 'GitBranch' },
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
