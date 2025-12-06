/**
 * TrendIndicator Component - Small inline trend visualization
 */

import { TrendingUp, TrendingDown, Minus, ArrowUp, ArrowDown } from 'lucide-react';

interface TrendIndicatorProps {
  value: number;
  showValue?: boolean;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  format?: 'percent' | 'number' | 'currency';
  inverted?: boolean; // For metrics where down is good (like CTI)
  label?: string;
}

export function TrendIndicator({
  value,
  showValue = true,
  showIcon = true,
  size = 'md',
  format = 'percent',
  inverted = false,
  label,
}: TrendIndicatorProps) {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const isNeutral = value === 0;

  // Determine if this is "good" or "bad"
  const isGood = inverted ? isNegative : isPositive;

  const colorClass = isNeutral
    ? 'text-gray-500'
    : isGood
    ? 'text-green-600'
    : 'text-red-600';

  const bgClass = isNeutral
    ? 'bg-gray-100'
    : isGood
    ? 'bg-green-50'
    : 'bg-red-50';

  const sizeStyles = {
    sm: { text: 'text-xs', icon: 'w-3 h-3', padding: 'px-1.5 py-0.5' },
    md: { text: 'text-sm', icon: 'w-4 h-4', padding: 'px-2 py-1' },
    lg: { text: 'text-base', icon: 'w-5 h-5', padding: 'px-3 py-1.5' },
  };

  const formatValue = () => {
    const absValue = Math.abs(value);
    const sign = value > 0 ? '+' : '';
    switch (format) {
      case 'percent':
        return `${sign}${value.toFixed(1)}%`;
      case 'currency':
        return `${sign}$${absValue.toLocaleString()}`;
      case 'number':
      default:
        return `${sign}${value.toLocaleString()}`;
    }
  };

  const Icon = isNeutral
    ? Minus
    : isPositive
    ? size === 'sm'
      ? ArrowUp
      : TrendingUp
    : size === 'sm'
    ? ArrowDown
    : TrendingDown;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full ${bgClass} ${colorClass} ${sizeStyles[size].padding} ${sizeStyles[size].text} font-medium`}
    >
      {showIcon && <Icon className={sizeStyles[size].icon} />}
      {showValue && <span>{formatValue()}</span>}
      {label && <span className="text-gray-500 font-normal ml-1">{label}</span>}
    </span>
  );
}

// Compact version for inline use
export function InlineTrend({
  value,
  inverted = false,
}: {
  value: number;
  inverted?: boolean;
}) {
  const isGood = inverted ? value < 0 : value > 0;
  const color = value === 0 ? 'text-gray-400' : isGood ? 'text-green-600' : 'text-red-600';
  const Icon = value === 0 ? Minus : value > 0 ? ArrowUp : ArrowDown;

  return (
    <span className={`inline-flex items-center ${color}`}>
      <Icon className="w-3 h-3" />
      <span className="text-xs">{Math.abs(value).toFixed(1)}%</span>
    </span>
  );
}
