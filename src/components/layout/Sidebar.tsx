/**
 * Sidebar Component - Persona selection and navigation
 */

import {
  User,
  TrendingUp,
  Building2,
  Shield,
  Database,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import type { PersonaId, ScenarioId } from '../../types';
import { PERSONAS } from '../../types';

const PERSONA_ICONS: Record<PersonaId, LucideIcon> = {
  'customer': User,
  'cfo': TrendingUp,
  'branch-manager': Building2,
  'fraud-analyst': Shield,
  'data-steward': Database,
};

interface SidebarProps {
  currentPersona: PersonaId | null;
  onPersonaSelect: (personaId: PersonaId) => void;
  onScenarioSelect?: (scenarioId: ScenarioId) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({
  currentPersona,
  onPersonaSelect,
  onScenarioSelect,
  isOpen = true,
  onClose,
}: SidebarProps) {
  const personas = Object.values(PERSONAS);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-full flex flex-col">
          {/* Logo area for mobile */}
          <div className="p-4 border-b border-gray-200 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">
              Select Persona
            </h2>
          </div>

          {/* Persona list */}
          <nav className="flex-1 overflow-y-auto p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Personas
            </h3>
            <ul className="space-y-2">
              {personas.map((persona) => {
                const Icon = PERSONA_ICONS[persona.id];
                const isActive = currentPersona === persona.id;

                return (
                  <li key={persona.id}>
                    <button
                      onClick={() => onPersonaSelect(persona.id)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-3 rounded-lg
                        transition-all duration-200 group
                        ${
                          isActive
                            ? 'bg-gray-100 shadow-sm'
                            : 'hover:bg-gray-50'
                        }
                      `}
                    >
                      <div
                        className={`
                          w-10 h-10 rounded-lg flex items-center justify-center
                          transition-all duration-200
                          ${
                            isActive
                              ? `bg-gradient-to-br ${persona.theme.bgGradient}`
                              : 'bg-gray-100 group-hover:bg-gray-200'
                          }
                        `}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            isActive ? 'text-white' : 'text-gray-600'
                          }`}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <p
                          className={`font-medium ${
                            isActive ? 'text-gray-900' : 'text-gray-700'
                          }`}
                        >
                          {persona.name}
                        </p>
                        <p className="text-xs text-gray-500">{persona.title}</p>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          isActive ? 'rotate-90' : ''
                        }`}
                      />
                    </button>

                    {/* Scenarios dropdown */}
                    {isActive && onScenarioSelect && (
                      <ul className="mt-2 ml-4 pl-4 border-l-2 border-gray-200 space-y-1">
                        {persona.scenarios.map((scenarioId) => (
                          <li key={scenarioId}>
                            <button
                              onClick={() => onScenarioSelect(scenarioId)}
                              className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                            >
                              {formatScenarioName(scenarioId)}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Demo User
                </p>
                <p className="text-xs text-gray-500">View all personas</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

/**
 * Format scenario ID to human-readable name
 */
function formatScenarioName(scenarioId: ScenarioId): string {
  return scenarioId
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
