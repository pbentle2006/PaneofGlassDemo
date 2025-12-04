/**
 * Pane of Glass - Unified Banking Interface
 *
 * Main application component that orchestrates the persona-based
 * agent interaction system.
 */

import { useState, useCallback } from 'react';
import { MainLayout } from './components/layout';
import { ChatInterface } from './components/chat';
import { AgentActivityPanel } from './components/shared';
import type { PersonaId, ScenarioId } from './types';

function App() {
  const [currentPersona, setCurrentPersona] = useState<PersonaId | null>(null);
  const [currentScenario, setCurrentScenario] = useState<ScenarioId | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePersonaSelect = (personaId: PersonaId) => {
    setCurrentPersona(personaId);
    setCurrentScenario(null); // Reset scenario when persona changes
  };

  const handleScenarioSelect = (scenarioId: ScenarioId) => {
    setCurrentScenario(scenarioId);
  };

  const handleProcessingChange = useCallback((processing: boolean) => {
    setIsProcessing(processing);
  }, []);

  return (
    <MainLayout
      currentPersona={currentPersona}
      onPersonaSelect={handlePersonaSelect}
      onScenarioSelect={handleScenarioSelect}
    >
      <div className="flex-1 flex overflow-hidden">
        {/* Main chat area */}
        <ChatInterface
          personaId={currentPersona}
          scenarioId={currentScenario}
          onProcessingChange={handleProcessingChange}
        />

        {/* Agent Activity Panel - visible on larger screens */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <AgentActivityPanel
            personaId={currentPersona}
            isProcessing={isProcessing}
            className="h-full"
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
