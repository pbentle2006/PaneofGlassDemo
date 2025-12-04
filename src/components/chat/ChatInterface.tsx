/**
 * ChatInterface Component - Main chat UI for agent interactions
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Loader2, Bot, User, Sparkles, RotateCcw, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Message, PersonaId, ScenarioId, AgentType } from '../../types';
import { PERSONAS } from '../../types';
import { agentRouter } from '../../agents';

interface ChatInterfaceProps {
  personaId: PersonaId | null;
  scenarioId: ScenarioId | null;
  onProcessingChange?: (isProcessing: boolean) => void;
}

export function ChatInterface({ personaId, scenarioId, onProcessingChange }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const persona = personaId ? PERSONAS[personaId] : null;

  // Notify parent of processing state changes
  useEffect(() => {
    onProcessingChange?.(isLoading);
  }, [isLoading, onProcessingChange]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset chat when persona changes
  useEffect(() => {
    if (personaId) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: getWelcomeMessage(personaId, scenarioId),
          timestamp: new Date(),
          agentType: getAgentType(personaId),
        },
      ]);
      inputRef.current?.focus();
    }
  }, [personaId, scenarioId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !personaId) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Simulate network delay for demo effect
      await new Promise(resolve => setTimeout(resolve, 1500));

      const response = await agentRouter.route(
        {
          personaId,
          scenarioId: scenarioId || 'check-balance',
          sessionId: 'demo-session',
          conversationHistory: messages,
          metadata: {},
        },
        userMessage.content
      );

      const assistantMessage: Message = {
        id: `msg-${Date.now()}-response`,
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
        agentType: response.agentType,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = useCallback(() => {
    if (personaId) {
      setMessages([
        {
          id: 'welcome-' + Date.now(),
          role: 'assistant',
          content: getWelcomeMessage(personaId, scenarioId),
          timestamp: new Date(),
          agentType: getAgentType(personaId),
        },
      ]);
    }
  }, [personaId, scenarioId]);

  const handleQuickAction = useCallback((action: string) => {
    setInputValue(action);
    inputRef.current?.focus();
  }, []);

  if (!personaId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Welcome to Pane of Glass
          </h2>
          <p className="text-gray-600 mb-6">
            Select a persona from the sidebar to begin. Each persona has specialized
            AI agents tailored to their unique needs and workflows.
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <QuickStartCard
              title="Customer"
              description="Banking & transactions"
              color="blue"
            />
            <QuickStartCard
              title="CFO"
              description="Financial insights"
              color="emerald"
            />
            <QuickStartCard
              title="Branch Manager"
              description="Operations & sales"
              color="amber"
            />
            <QuickStartCard
              title="Fraud Analyst"
              description="Investigation & risk"
              color="violet"
            />
          </div>
        </div>
      </div>
    );
  }

  const quickActions = getQuickActions(personaId);

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Chat header */}
      <div
        className="px-4 py-3 border-b bg-white flex items-center justify-between"
        style={{ borderBottomColor: persona?.theme.primary }}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
              persona?.theme.bgGradient || 'from-gray-500 to-gray-700'
            } flex items-center justify-center`}
          >
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">
              {getAgentName(personaId)}
            </h2>
            <p className="text-xs text-gray-500">
              {scenarioId
                ? formatScenarioName(scenarioId)
                : persona?.description}
            </p>
          </div>
        </div>
        <button
          onClick={handleClearChat}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          title="Clear conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} persona={persona} />
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${
                persona?.theme.bgGradient || 'from-gray-500 to-gray-700'
              }`}
            >
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick actions */}
      {messages.length === 1 && quickActions.length > 0 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickAction(action)}
                className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full hover:border-gray-300 hover:bg-gray-50 transition-colors text-gray-600"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white border-t border-gray-200"
      >
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-shadow"
            style={{
              '--tw-ring-color': persona?.theme.primary,
            } as React.CSSProperties}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            style={{
              backgroundColor: persona?.theme.primary || '#3b82f6',
            }}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

interface ChatMessageProps {
  message: Message;
  persona: (typeof PERSONAS)[PersonaId] | null;
}

function ChatMessage({ message, persona }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser
            ? 'bg-gray-200'
            : `bg-gradient-to-br ${persona?.theme.bgGradient || 'from-gray-500 to-gray-700'}`
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-gray-600" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 group relative ${
          isUser
            ? 'bg-gray-200 text-gray-900'
            : 'bg-white border border-gray-200 text-gray-800'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap text-sm">{message.content}</p>
        ) : (
          <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0 prose-strong:text-gray-900">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-400">
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {!isUser && (
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 transition-opacity"
              title="Copy message"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface QuickStartCardProps {
  title: string;
  description: string;
  color: 'blue' | 'emerald' | 'amber' | 'violet';
}

function QuickStartCard({ title, description, color }: QuickStartCardProps) {
  const colors = {
    blue: 'bg-blue-50 border-blue-100 text-blue-700',
    emerald: 'bg-emerald-50 border-emerald-100 text-emerald-700',
    amber: 'bg-amber-50 border-amber-100 text-amber-700',
    violet: 'bg-violet-50 border-violet-100 text-violet-700',
  };

  return (
    <div className={`p-3 rounded-lg border ${colors[color]}`}>
      <p className="font-medium">{title}</p>
      <p className="text-xs opacity-75">{description}</p>
    </div>
  );
}

function getWelcomeMessage(personaId: PersonaId, _scenarioId: ScenarioId | null): string {
  const messages: Record<PersonaId, string> = {
    'customer': `Hello! I'm your personal banking assistant. I can help you with:\n\n- **Account balances** and transaction history\n- **Money transfers** between accounts\n- **Bill payments** and scheduled transfers\n- **Loan applications** and pre-approvals\n\nWhat can I help you with today?`,
    'cfo': `Good morning. I'm your Financial Intelligence Agent, ready to provide executive-level insights.\n\n**Available Analysis:**\n- Financial performance & KPIs\n- Risk assessment & compliance\n- Budget forecasting & variance\n- Competitor benchmarking\n\nHow may I assist you today?`,
    'branch-manager': `Hello! I'm your Operations Assistant for the Chatswood branch.\n\n**I can help with:**\n- Weekly performance metrics\n- Staff management & coaching\n- Sales opportunities & hot leads\n- Investment ROI analysis\n\nWhat would you like to review?`,
    'fraud-analyst': `Welcome to the Fraud Detection Center.\n\n**Today's Overview:**\n- 183 alerts in queue\n- 3 critical priority cases\n- 2 active investigations\n\nI can help you triage alerts, investigate cases, and assess portfolio risk. What would you like to focus on?`,
  };

  return messages[personaId];
}

function getAgentName(personaId: PersonaId): string {
  const names: Record<PersonaId, string> = {
    'customer': 'Customer Service Agent',
    'cfo': 'Financial Intelligence Agent',
    'branch-manager': 'Operations Assistant',
    'fraud-analyst': 'Fraud Detection Agent',
  };
  return names[personaId];
}

function getAgentType(personaId: PersonaId): AgentType {
  const types: Record<PersonaId, AgentType> = {
    'customer': 'customer-service',
    'cfo': 'financial-advisor',
    'branch-manager': 'operations',
    'fraud-analyst': 'fraud-detection',
  };
  return types[personaId];
}

function getQuickActions(personaId: PersonaId): string[] {
  const actions: Record<PersonaId, string[]> = {
    'customer': [
      "What's my account balance?",
      "Show my recent transactions",
      "I want to transfer money",
      "Am I eligible for a car loan?",
    ],
    'cfo': [
      "What's our cost-to-income ratio?",
      "How do we compare to CBA?",
      "Show me underperforming branches",
      "Model a 2% interest rate rise",
    ],
    'branch-manager': [
      "How did we perform this week?",
      "Who should I call about home loans?",
      "Show me team performance",
      "What's the ROI on digital queue system?",
    ],
    'fraud-analyst': [
      "Show me critical alerts",
      "What's the BEC case status?",
      "Which segments are at risk?",
      "What threats should I watch for in Q1?",
    ],
  };
  return actions[personaId];
}

function formatScenarioName(scenarioId: ScenarioId): string {
  return scenarioId
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
