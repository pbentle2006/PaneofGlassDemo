# Pane of Glass - Project Overview

## Vision
A single unified interface that serves 4 distinct personas in a financial institution, using AI agent orchestration to provide tailored experiences for each user type.

## Personas

### 1. Customer (Alex Thompson)
- **Role**: Bank Customer
- **Theme**: Trust Blue (#2563eb)
- **Scenarios**:
  - Check Balance
  - Dispute Charge
  - Apply for Loan
  - Transfer Money
- **Agent**: Customer Service Agent

### 2. CFO (Sarah Chen)
- **Role**: Chief Financial Officer
- **Theme**: Executive Green (#059669)
- **Scenarios**:
  - Financial Overview
  - Risk Analysis
  - Budget Forecast
  - Compliance Report
- **Agent**: Financial Advisor Agent

### 3. Branch Manager (Michael Roberts)
- **Role**: Branch Manager
- **Theme**: Operations Amber (#d97706)
- **Scenarios**:
  - Daily Operations
  - Staff Performance
  - Customer Satisfaction
  - Branch Metrics
- **Agent**: Operations Agent

### 4. Fraud Analyst (Jessica Martinez)
- **Role**: Senior Fraud Analyst
- **Theme**: Security Purple (#7c3aed)
- **Scenarios**:
  - Suspicious Activity
  - Fraud Patterns
  - Case Investigation
  - Risk Scoring
- **Agent**: Fraud Detection Agent

## Technical Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **AI**: Anthropic Claude API

### Architecture Pattern
```
┌─────────────────────────────────────────────┐
│              Pane of Glass UI               │
│         (Single React Application)          │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│            Agent Orchestrator               │
│    (Routes to specialized agents)           │
└─────────────────┬───────────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
┌───▼───┐   ┌────▼────┐   ┌────▼────┐
│Customer│   │Financial│   │  Fraud  │
│ Agent  │   │  Agent  │   │  Agent  │
└────────┘   └─────────┘   └─────────┘
```

### Project Structure
```
src/
├── agents/           # Agent definitions and router
├── components/
│   ├── chat/         # Chat interface components
│   ├── layout/       # Layout components (Header, Sidebar)
│   ├── personas/     # Persona-specific components
│   └── shared/       # Shared/reusable components
├── context/          # React context providers
├── hooks/            # Custom React hooks
├── services/         # API services (Claude wrapper)
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## 6-Week Build Plan

### Week 1: Foundation
- [x] Day 1: Project setup, structure, types, basic layout
- [ ] Day 2-3: Chat interface refinement
- [ ] Day 4-5: Agent router improvements

### Week 2: Customer Persona
- [ ] Customer Service Agent implementation
- [ ] 4 scenario implementations
- [ ] Mock data and simulations

### Week 3: CFO Persona
- [ ] Financial Advisor Agent implementation
- [ ] Dashboard with Recharts
- [ ] 4 scenario implementations

### Week 4: Branch Manager Persona
- [ ] Operations Agent implementation
- [ ] Staff management UI
- [ ] 4 scenario implementations

### Week 5: Fraud Analyst Persona
- [ ] Fraud Detection Agent implementation
- [ ] Alert system UI
- [ ] 4 scenario implementations

### Week 6: Polish & Integration
- [ ] Cross-persona testing
- [ ] Performance optimization
- [ ] Documentation
- [ ] Demo preparation

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and add your API key
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`
5. Open http://localhost:5173 in your browser
