/**
 * Header Component - Top navigation bar
 */

import { Menu, Bell, Settings, User } from 'lucide-react';
import type { PersonaId } from '../../types';
import { PERSONAS } from '../../types';

interface HeaderProps {
  currentPersona: PersonaId | null;
  onMenuClick?: () => void;
}

export function Header({ currentPersona, onMenuClick }: HeaderProps) {
  const persona = currentPersona ? PERSONAS[currentPersona] : null;

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
              persona?.theme.bgGradient || 'from-[#DA1710] to-[#990000]'
            } flex items-center justify-center`}
          >
            <span className="text-white font-bold text-lg">W</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Westpac
            </h1>
            <p className="text-xs text-gray-500">
              Unified Banking Interface
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {persona && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: persona.theme.primary }}
            />
            <span className="text-sm text-gray-700">{persona.title}</span>
          </div>
        )}

        <button
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 text-gray-600" />
        </button>

        <button
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Profile"
        >
          <User className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
}
