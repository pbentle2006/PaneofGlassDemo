/**
 * ChatInterface Component - Main chat UI for agent interactions
 */

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User, Sparkles } from 'lucide-react';
import type { Message, PersonaId, ScenarioId, AgentType } from '../../types';
import { PERSONAS } from '../../types';
import { agentRouter } from '../../agents';

interface ChatInterfaceProps {
  personaId: PersonaId | null;
  scenarioId: ScenarioId | null;
}

export function ChatInterface({ personaId, scenarioId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const persona = personaId ? PERSONAS[personaId] : null;

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
          <p className="text-gray-600">
            Select a persona from the sidebar to begin. Each persona has specialized
            AI agents tailored to their unique needs and workflows.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Chat header */}
      <div
        className="px-4 py-3 border-b bg-white"
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
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} persona={persona} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Agent is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white border-t border-gray-200"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            style={{
              backgroundColor: inputValue.trim() && !isLoading
                ? persona?.theme.primary
                : undefined,
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
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-gray-200 text-gray-900'
            : 'bg-white border border-gray-200 text-gray-800'
        }`}
      >
        <p className="whitespace-pre-wrap text-sm">{message.content}</p>
        <span className="text-xs text-gray-400 mt-1 block">
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
}

function getWelcomeMessage(personaId: PersonaId, _scenarioId: ScenarioId | null): string {
  const messages: Record<PersonaId, string> = {
    'customer': `Hello! I'm your personal banking assistant. I can help you with account inquiries, transfers, disputes, and more. What can I help you with today?`,
    'cfo': `Good morning. I'm your Financial Intelligence Agent. I'm ready to provide insights on financial performance, risk analysis, forecasting, and compliance matters. How may I assist you?`,
    'branch-manager': `Hello! I'm your Operations Assistant. I can help you monitor branch performance, manage staff schedules, track customer satisfaction, and optimize daily operations. What would you like to review?`,
    'fraud-analyst': `Welcome to the Fraud Detection Center. I'm here to help you investigate suspicious activities, analyze fraud patterns, and manage cases. What would you like to investigate?`,
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

function formatScenarioName(scenarioId: ScenarioId): string {
  return scenarioId
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
