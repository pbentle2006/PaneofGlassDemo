/**
 * MetricCard Component - Displays key metrics with trend indicators
 */

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    label?: string;
  };
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'amber' | 'violet' | 'red' | 'gray';
  size?: 'sm' | 'md' | 'lg';
}

// Westpac Brand Color Styles
const colorStyles = {
  blue: 'bg-indigo-50 border-indigo-200 text-[#1F1C4F]',      // Port Gore
  green: 'bg-green-50 border-green-200 text-green-700',        // Keep for success
  amber: 'bg-purple-50 border-purple-200 text-[#991AD6]',      // Bright Purple
  violet: 'bg-gray-100 border-gray-300 text-[#2A2E42]',        // Neutral Dark
  red: 'bg-red-50 border-red-200 text-[#DA1710]',              // Westpac Crimson
  gray: 'bg-gray-50 border-gray-200 text-gray-700',
};

const iconColors = {
  blue: 'bg-indigo-100 text-[#1F1C4F]',       // Port Gore
  green: 'bg-green-100 text-green-600',        // Keep for success
  amber: 'bg-purple-100 text-[#991AD6]',       // Bright Purple
  violet: 'bg-gray-200 text-[#2A2E42]',        // Neutral Dark
  red: 'bg-red-100 text-[#DA1710]',            // Westpac Crimson
  gray: 'bg-gray-100 text-gray-600',
};

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  color = 'gray',
  size = 'md',
}: MetricCardProps) {
  const sizeStyles = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5',
  };

  const valueSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.value > 0) return <TrendingUp className="w-4 h-4" />;
    if (trend.value < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (!trend) return '';
    if (trend.value > 0) return 'text-green-600';
    if (trend.value < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  return (
    <div
      className={`rounded-lg border ${colorStyles[color]} ${sizeStyles[size]}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className={`font-bold mt-1 ${valueSizes[size]}`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {subtitle && (
            <p className="text-xs opacity-70 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${getTrendColor()}`}>
              {getTrendIcon()}
              <span>
                {trend.value > 0 ? '+' : ''}
                {trend.value}%
              </span>
              {trend.label && (
                <span className="text-gray-500 ml-1">{trend.label}</span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className={`p-2 rounded-lg ${iconColors[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
