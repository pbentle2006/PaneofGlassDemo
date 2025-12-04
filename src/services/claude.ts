/**
 * Claude Service - Wrapper for Claude API communication
 *
 * Note: In production, API calls should go through a backend proxy
 * to protect the API key. This service supports both direct and proxied modes.
 */

import Anthropic from '@anthropic-ai/sdk';
import type { AgentResponse, AgentContext, AgentType } from '../types';

export interface ClaudeConfig {
  apiKey?: string;
  baseUrl?: string;
  model?: string;
  maxTokens?: number;
}

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

const DEFAULT_CONFIG: Required<Omit<ClaudeConfig, 'apiKey'>> & { apiKey: string } = {
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.anthropic.com',
  model: 'claude-sonnet-4-20250514',
  maxTokens: 4096,
};

class ClaudeService {
  private client: Anthropic | null = null;
  private config: typeof DEFAULT_CONFIG;

  constructor(config?: ClaudeConfig) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.initializeClient();
  }

  private initializeClient(): void {
    if (this.config.apiKey) {
      this.client = new Anthropic({
        apiKey: this.config.apiKey,
        dangerouslyAllowBrowser: true, // Only for demo purposes
      });
    }
  }

  /**
   * Check if the service is properly configured
   */
  isConfigured(): boolean {
    return !!this.config.apiKey && !!this.client;
  }

  /**
   * Update configuration at runtime
   */
  updateConfig(config: Partial<ClaudeConfig>): void {
    this.config = { ...this.config, ...config };
    if (config.apiKey) {
      this.initializeClient();
    }
  }

  /**
   * Send a message to Claude with a system prompt
   */
  async sendMessage(
    systemPrompt: string,
    messages: ClaudeMessage[],
    options?: {
      maxTokens?: number;
      temperature?: number;
      stopSequences?: string[];
    }
  ): Promise<string> {
    if (!this.client) {
      throw new Error('Claude client not initialized. Please provide an API key.');
    }

    try {
      const response = await this.client.messages.create({
        model: this.config.model,
        max_tokens: options?.maxTokens || this.config.maxTokens,
        system: systemPrompt,
        messages: messages.map(m => ({
          role: m.role,
          content: m.content,
        })),
        ...(options?.temperature && { temperature: options.temperature }),
        ...(options?.stopSequences && { stop_sequences: options.stopSequences }),
      });

      // Extract text from response
      const textContent = response.content.find(block => block.type === 'text');
      return textContent?.type === 'text' ? textContent.text : '';
    } catch (error) {
      console.error('Claude API error:', error);
      throw error;
    }
  }

  /**
   * Send a message with streaming response
   */
  async streamMessage(
    systemPrompt: string,
    messages: ClaudeMessage[],
    onChunk: (chunk: string) => void,
    options?: {
      maxTokens?: number;
      temperature?: number;
    }
  ): Promise<string> {
    if (!this.client) {
      throw new Error('Claude client not initialized. Please provide an API key.');
    }

    let fullResponse = '';

    try {
      const stream = this.client.messages.stream({
        model: this.config.model,
        max_tokens: options?.maxTokens || this.config.maxTokens,
        system: systemPrompt,
        messages: messages.map(m => ({
          role: m.role,
          content: m.content,
        })),
        ...(options?.temperature && { temperature: options.temperature }),
      });

      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          const text = event.delta.text;
          fullResponse += text;
          onChunk(text);
        }
      }

      return fullResponse;
    } catch (error) {
      console.error('Claude streaming error:', error);
      throw error;
    }
  }

  /**
   * Process an agent request with context
   */
  async processAgentRequest(
    context: AgentContext,
    userMessage: string,
    agentSystemPrompt: string
  ): Promise<AgentResponse> {
    // Build conversation history
    const messages: ClaudeMessage[] = context.conversationHistory
      .filter(m => m.role !== 'system')
      .map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

    // Add the new user message
    messages.push({ role: 'user', content: userMessage });

    // Get response from Claude
    const response = await this.sendMessage(agentSystemPrompt, messages);

    return {
      message: response,
      agentType: this.determineAgentType(context, response),
    };
  }

  /**
   * Determine if response suggests agent handoff
   */
  private determineAgentType(_context: AgentContext, response: string): AgentType {
    // Simple heuristic - in production, use more sophisticated routing
    const lowerResponse = response.toLowerCase();

    if (lowerResponse.includes('fraud') || lowerResponse.includes('suspicious')) {
      return 'fraud-detection';
    }
    if (lowerResponse.includes('budget') || lowerResponse.includes('forecast')) {
      return 'financial-advisor';
    }
    if (lowerResponse.includes('staff') || lowerResponse.includes('branch')) {
      return 'operations';
    }

    return 'customer-service';
  }
}

// Export singleton instance
export const claudeService = new ClaudeService();

// Export class for testing
export { ClaudeService };
