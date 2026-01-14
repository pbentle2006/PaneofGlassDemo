/**
 * AlertQueue Component - Prioritized list of fraud alerts
 */

import { AlertTriangle, AlertCircle, Info, Clock, ChevronRight } from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  timestamp: string;
  amount?: number;
  riskScore?: number;
}

interface AlertQueueProps {
  alerts: Alert[];
  title?: string;
  maxItems?: number;
  onAlertClick?: (alert: Alert) => void;
}

// Westpac Brand Priority Colors
const priorityConfig = {
  critical: {
    icon: AlertTriangle,
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-[#DA1710]',           // Westpac Crimson
    badge: 'bg-red-100 text-[#DA1710]',
    iconColor: 'text-[#DA1710]',
  },
  high: {
    icon: AlertCircle,
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-[#991AD6]',           // Westpac Bright Purple
    badge: 'bg-purple-100 text-[#991AD6]',
    iconColor: 'text-[#991AD6]',
  },
  medium: {
    icon: Info,
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-[#1F1C4F]',           // Westpac Port Gore
    badge: 'bg-indigo-100 text-[#1F1C4F]',
    iconColor: 'text-[#1F1C4F]',
  },
  low: {
    icon: Info,
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    text: 'text-[#2A2E42]',           // Westpac Neutral
    badge: 'bg-gray-100 text-[#2A2E42]',
    iconColor: 'text-[#595767]',
  },
};

export function AlertQueue({
  alerts,
  title = 'Alert Queue',
  maxItems = 5,
  onAlertClick,
}: AlertQueueProps) {
  const displayedAlerts = alerts.slice(0, maxItems);
  const remainingCount = alerts.length - maxItems;

  const priorityCounts = {
    critical: alerts.filter((a) => a.priority === 'critical').length,
    high: alerts.filter((a) => a.priority === 'high').length,
    medium: alerts.filter((a) => a.priority === 'medium').length,
    low: alerts.filter((a) => a.priority === 'low').length,
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <span className="text-xs text-gray-500">{alerts.length} total</span>
        </div>
        {/* Priority summary - Westpac colors */}
        <div className="flex gap-2 mt-2">
          {priorityCounts.critical > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-[#DA1710]">
              {priorityCounts.critical} Critical
            </span>
          )}
          {priorityCounts.high > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-[#991AD6]">
              {priorityCounts.high} High
            </span>
          )}
          {priorityCounts.medium > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-[#1F1C4F]">
              {priorityCounts.medium} Medium
            </span>
          )}
        </div>
      </div>

      {/* Alert list */}
      <div className="divide-y divide-gray-100">
        {displayedAlerts.map((alert) => {
          const config = priorityConfig[alert.priority];
          const Icon = config.icon;

          return (
            <div
              key={alert.id}
              className={`p-3 ${config.bg} hover:brightness-95 transition-all cursor-pointer`}
              onClick={() => onAlertClick?.(alert)}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-medium ${config.text} truncate`}>
                      {alert.title}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${config.badge}`}>
                      {alert.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">
                    {alert.description}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {alert.timestamp}
                    </span>
                    {alert.amount && (
                      <span className="font-medium text-gray-700">
                        ${alert.amount.toLocaleString()}
                      </span>
                    )}
                    {alert.riskScore && (
                      <span className={`font-medium ${alert.riskScore >= 80 ? 'text-red-600' : 'text-amber-600'}`}>
                        Risk: {alert.riskScore}%
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {remainingCount > 0 && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <button className="text-xs text-[#DA1710] hover:text-[#990000] font-medium">
            View {remainingCount} more alerts →
          </button>
        </div>
      )}
    </div>
  );
}

// Demo alert data
export const DEMO_ALERTS: Alert[] = [
  {
    id: 'alert-1',
    title: 'Unusual Wire Transfer Pattern',
    description: 'Multiple large transfers to new beneficiary in high-risk jurisdiction',
    priority: 'critical',
    timestamp: '2 min ago',
    amount: 125000,
    riskScore: 94,
  },
  {
    id: 'alert-2',
    title: 'Account Takeover Attempt',
    description: 'Password reset from unrecognized device after credential stuffing attack',
    priority: 'critical',
    timestamp: '8 min ago',
    riskScore: 89,
  },
  {
    id: 'alert-3',
    title: 'BEC Invoice Redirect',
    description: 'Vendor email compromise detected, payment redirect requested',
    priority: 'high',
    timestamp: '15 min ago',
    amount: 47500,
    riskScore: 76,
  },
  {
    id: 'alert-4',
    title: 'Rapid Card-Not-Present Transactions',
    description: '12 online transactions in 30 minutes across different merchants',
    priority: 'high',
    timestamp: '23 min ago',
    amount: 3420,
    riskScore: 72,
  },
  {
    id: 'alert-5',
    title: 'New Payee Velocity',
    description: 'Account added 8 new payees in 24 hours',
    priority: 'medium',
    timestamp: '45 min ago',
    riskScore: 58,
  },
];
