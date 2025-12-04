/**
 * Pane of Glass - Unified Banking Interface
 *
 * Main application component that orchestrates the persona-based
 * agent interaction system.
 */

import { useState } from 'react';
import { MainLayout } from './components/layout';
import { ChatInterface } from './components/chat';
import type { PersonaId, ScenarioId } from './types';

function App() {
  const [currentPersona, setCurrentPersona] = useState<PersonaId | null>(null);
  const [currentScenario, setCurrentScenario] = useState<ScenarioId | null>(null);

  const handlePersonaSelect = (personaId: PersonaId) => {
    setCurrentPersona(personaId);
    setCurrentScenario(null); // Reset scenario when persona changes
  };

  const handleScenarioSelect = (scenarioId: ScenarioId) => {
    setCurrentScenario(scenarioId);
  };

  return (
    <MainLayout
      currentPersona={currentPersona}
      onPersonaSelect={handlePersonaSelect}
      onScenarioSelect={handleScenarioSelect}
    >
      <ChatInterface
        personaId={currentPersona}
        scenarioId={currentScenario}
      />
    </MainLayout>
  );
}

export default App;
