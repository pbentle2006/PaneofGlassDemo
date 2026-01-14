/**
 * AgentActivityPanel - Shows real-time agent orchestration visualization
 */

import { useState, useEffect } from 'react';
import {
  Bot,
  Database,
  Cpu,
  CheckCircle2,
  Circle,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Users,
  CreditCard,
} from 'lucide-react';
import type { AgentType, PersonaId } from '../../types';

interface AgentActivity {
  agentType: AgentType;
  status: 'idle' | 'thinking' | 'fetching' | 'responding' | 'complete';
  dataSources: string[];
  startTime?: number;
  duration?: number;
}

interface AgentActivityPanelProps {
  personaId: PersonaId | null;
  isProcessing: boolean;
  currentAgent?: AgentType;
  className?: string;
}

// Westpac Brand Colors for Agent Types
const AGENT_INFO: Record<AgentType, { name: string; icon: typeof Bot; color: string; dataSources: string[] }> = {
  'orchestrator': {
    name: 'Orchestrator',
    icon: Cpu,
    color: 'text-gray-600',
    dataSources: ['Context Engine', 'Routing Rules'],
  },
  'customer-service': {
    name: 'Customer Service',
    icon: Users,
    color: 'text-[#DA1710]',  // Westpac Crimson
    dataSources: ['Core Banking', 'CRM', 'Transaction History', 'Product Catalog'],
  },
  'financial-advisor': {
    name: 'Financial Intelligence',
    icon: TrendingUp,
    color: 'text-[#1F1C4F]',  // Westpac Port Gore
    dataSources: ['Data Warehouse', 'Risk System', 'Market Data', 'Regulatory DB'],
  },
  'operations': {
    name: 'Operations',
    icon: CreditCard,
    color: 'text-[#991AD6]',  // Westpac Bright Purple
    dataSources: ['Branch Systems', 'CRM', 'Sales Pipeline', 'Staff Schedule'],
  },
  'fraud-detection': {
    name: 'Fraud Detection',
    icon: Shield,
    color: 'text-[#2A2E42]',  // Westpac Neutral
    dataSources: ['Fraud Engine', 'Transaction Monitor', 'Threat Intel', 'Case System'],
  },
};

const PERSONA_PRIMARY_AGENT: Record<PersonaId, AgentType> = {
  'customer': 'customer-service',
  'cfo': 'financial-advisor',
  'branch-manager': 'operations',
  'fraud-analyst': 'fraud-detection',
};

export function AgentActivityPanel({
  personaId,
  isProcessing,
  currentAgent,
  className = '',
}: AgentActivityPanelProps) {
  const [activities, setActivities] = useState<AgentActivity[]>([]);
  const [activeDataSources, setActiveDataSources] = useState<string[]>([]);

  // Simulate agent activity when processing
  useEffect(() => {
    if (!isProcessing || !personaId) {
      // Reset after a delay when processing completes
      const timer = setTimeout(() => {
        setActivities([]);
        setActiveDataSources([]);
      }, 2000);
      return () => clearTimeout(timer);
    }

    const primaryAgent = currentAgent || PERSONA_PRIMARY_AGENT[personaId];
    const agentInfo = AGENT_INFO[primaryAgent];

    // Start orchestrator
    setActivities([
      { agentType: 'orchestrator', status: 'thinking', dataSources: ['Context Engine'] },
    ]);

    // After 300ms, orchestrator completes and routes to primary agent
    const timer1 = setTimeout(() => {
      setActivities([
        { agentType: 'orchestrator', status: 'complete', dataSources: ['Context Engine', 'Routing Rules'], duration: 280 },
        { agentType: primaryAgent, status: 'thinking', dataSources: [] },
      ]);
    }, 300);

    // After 600ms, primary agent starts fetching data
    const timer2 = setTimeout(() => {
      setActivities([
        { agentType: 'orchestrator', status: 'complete', dataSources: ['Context Engine', 'Routing Rules'], duration: 280 },
        { agentType: primaryAgent, status: 'fetching', dataSources: agentInfo.dataSources.slice(0, 2) },
      ]);
      setActiveDataSources(agentInfo.dataSources.slice(0, 2));
    }, 600);

    // After 1000ms, more data sources
    const timer3 = setTimeout(() => {
      setActivities([
        { agentType: 'orchestrator', status: 'complete', dataSources: ['Context Engine', 'Routing Rules'], duration: 280 },
        { agentType: primaryAgent, status: 'fetching', dataSources: agentInfo.dataSources },
      ]);
      setActiveDataSources(agentInfo.dataSources);
    }, 1000);

    // After 1500ms, agent starts responding
    const timer4 = setTimeout(() => {
      setActivities([
        { agentType: 'orchestrator', status: 'complete', dataSources: ['Context Engine', 'Routing Rules'], duration: 280 },
        { agentType: primaryAgent, status: 'responding', dataSources: agentInfo.dataSources },
      ]);
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isProcessing, personaId, currentAgent]);

  if (!personaId) {
    return (
      <div className={`bg-white border-l border-gray-200 p-4 ${className}`}>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Agent Activity
        </h3>
        <p className="text-sm text-gray-400">Select a persona to see agent orchestration</p>
      </div>
    );
  }

  const primaryAgent = PERSONA_PRIMARY_AGENT[personaId];

  return (
    <div className={`bg-white border-l border-gray-200 p-4 overflow-y-auto ${className}`}>
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Agent Activity
      </h3>

      {/* Agent Pipeline */}
      <div className="space-y-3 mb-6">
        <AgentCard
          agent="orchestrator"
          activity={activities.find(a => a.agentType === 'orchestrator')}
          isActive={isProcessing && activities.some(a => a.agentType === 'orchestrator' && a.status !== 'complete')}
        />

        <div className="flex justify-center">
          <ArrowRight className="w-4 h-4 text-gray-300" />
        </div>

        <AgentCard
          agent={primaryAgent}
          activity={activities.find(a => a.agentType === primaryAgent)}
          isActive={isProcessing && activities.some(a => a.agentType === primaryAgent && a.status !== 'complete')}
        />
      </div>

      {/* Data Sources */}
      <div className="border-t border-gray-100 pt-4">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Database className="w-3 h-3" />
          Data Sources
        </h4>
        <div className="space-y-2">
          {AGENT_INFO[primaryAgent].dataSources.map((source) => (
            <DataSourceIndicator
              key={source}
              name={source}
              isActive={activeDataSources.includes(source)}
            />
          ))}
        </div>
      </div>

      {/* Processing Stats */}
      {activities.length > 0 && (
        <div className="border-t border-gray-100 pt-4 mt-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Zap className="w-3 h-3" />
            Performance
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-50 rounded p-2">
              <p className="text-gray-500">Routing</p>
              <p className="font-semibold text-gray-700">
                {activities.find(a => a.agentType === 'orchestrator')?.duration || '...'} ms
              </p>
            </div>
            <div className="bg-gray-50 rounded p-2">
              <p className="text-gray-500">Sources</p>
              <p className="font-semibold text-gray-700">{activeDataSources.length} active</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface AgentCardProps {
  agent: AgentType;
  activity?: AgentActivity;
  isActive: boolean;
}

function AgentCard({ agent, activity, isActive }: AgentCardProps) {
  const info = AGENT_INFO[agent];
  const Icon = info.icon;

  const statusColors = {
    idle: 'bg-gray-100 border-gray-200',
    thinking: 'bg-blue-50 border-blue-200 animate-pulse',
    fetching: 'bg-amber-50 border-amber-200 animate-pulse',
    responding: 'bg-green-50 border-green-200 animate-pulse',
    complete: 'bg-green-50 border-green-200',
  };

  const status = activity?.status || 'idle';

  return (
    <div
      className={`
        rounded-lg border p-3 transition-all duration-300
        ${statusColors[status]}
      `}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-1.5 rounded ${isActive ? 'bg-white' : 'bg-gray-100'}`}>
          <Icon className={`w-4 h-4 ${info.color}`} />
        </div>
        <span className="text-sm font-medium text-gray-700">{info.name}</span>
        {status === 'complete' && (
          <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
        )}
      </div>
      <div className="text-xs text-gray-500">
        {status === 'idle' && 'Waiting...'}
        {status === 'thinking' && 'Analyzing request...'}
        {status === 'fetching' && `Fetching from ${activity?.dataSources.length || 0} sources...`}
        {status === 'responding' && 'Generating response...'}
        {status === 'complete' && `Completed in ${activity?.duration || 0}ms`}
      </div>
    </div>
  );
}

interface DataSourceIndicatorProps {
  name: string;
  isActive: boolean;
}

function DataSourceIndicator({ name, isActive }: DataSourceIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <Circle
        className={`w-2 h-2 transition-colors duration-300 ${
          isActive ? 'fill-green-500 text-green-500' : 'fill-gray-200 text-gray-200'
        }`}
      />
      <span
        className={`text-xs transition-colors duration-300 ${
          isActive ? 'text-gray-700' : 'text-gray-400'
        }`}
      >
        {name}
      </span>
      {isActive && (
        <span className="text-xs text-green-600 ml-auto">Connected</span>
      )}
    </div>
  );
}
