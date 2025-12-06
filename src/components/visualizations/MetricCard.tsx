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

const colorStyles = {
  blue: 'bg-blue-50 border-blue-200 text-blue-700',
  green: 'bg-green-50 border-green-200 text-green-700',
  amber: 'bg-amber-50 border-amber-200 text-amber-700',
  violet: 'bg-violet-50 border-violet-200 text-violet-700',
  red: 'bg-red-50 border-red-200 text-red-700',
  gray: 'bg-gray-50 border-gray-200 text-gray-700',
};

const iconColors = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  amber: 'bg-amber-100 text-amber-600',
  violet: 'bg-violet-100 text-violet-600',
  red: 'bg-red-100 text-red-600',
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
