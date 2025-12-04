/**
 * MainLayout Component - Root layout structure
 */

import { useState, type ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import type { PersonaId, ScenarioId } from '../../types';

interface MainLayoutProps {
  children: ReactNode;
  currentPersona: PersonaId | null;
  onPersonaSelect: (personaId: PersonaId) => void;
  onScenarioSelect?: (scenarioId: ScenarioId) => void;
}

export function MainLayout({
  children,
  currentPersona,
  onPersonaSelect,
  onScenarioSelect,
}: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        currentPersona={currentPersona}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          currentPersona={currentPersona}
          onPersonaSelect={(personaId) => {
            onPersonaSelect(personaId);
            setSidebarOpen(false);
          }}
          onScenarioSelect={(scenarioId) => {
            onScenarioSelect?.(scenarioId);
            setSidebarOpen(false);
          }}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 overflow-hidden flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
