/**
 * KPIGauge Component - Radial gauge for KPI visualization
 */

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface KPIGaugeProps {
  value: number;
  target: number;
  min?: number;
  max?: number;
  title: string;
  unit?: string;
  color?: 'blue' | 'green' | 'amber' | 'red';
  size?: 'sm' | 'md' | 'lg';
}

// Westpac Brand Color Map
const colorMap = {
  blue: { fill: '#1F1C4F', bg: '#E8E8ED' },     // Port Gore with light bg
  green: { fill: '#10b981', bg: '#d1fae5' },    // Keep green for success indicators
  amber: { fill: '#991AD6', bg: '#F3E8FF' },    // Bright Purple with light purple bg
  red: { fill: '#DA1710', bg: '#FEE2E2' },      // Westpac Crimson
};

export function KPIGauge({
  value,
  target,
  min = 0,
  max = 100,
  title,
  unit = '%',
  color = 'blue',
  size = 'md',
}: KPIGaugeProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  const data = [
    { value: percentage },
    { value: 100 - percentage },
  ];

  const sizes = {
    sm: { width: 100, height: 60, fontSize: 'text-lg' },
    md: { width: 140, height: 80, fontSize: 'text-2xl' },
    lg: { width: 180, height: 100, fontSize: 'text-3xl' },
  };

  const isAboveTarget = value >= target;
  const statusColor = isAboveTarget ? 'text-green-600' : 'text-amber-600';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
      <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
      <div className="relative" style={{ height: sizes[size].height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius="60%"
              outerRadius="100%"
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill={colorMap[color].fill} />
              <Cell fill={colorMap[color].bg} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-end justify-center pb-1">
          <span className={`font-bold ${sizes[size].fontSize}`}>
            {value.toFixed(1)}
            <span className="text-sm font-normal text-gray-500">{unit}</span>
          </span>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-center gap-2 text-sm">
        <span className="text-gray-500">Target: {target}{unit}</span>
        <span className={`font-medium ${statusColor}`}>
          {isAboveTarget ? '✓ On Track' : '⚠ Below'}
        </span>
      </div>
    </div>
  );
}

// Demo KPI data
export const CFO_KPIS = [
  { title: 'Cost-to-Income', value: 52.3, target: 50, unit: '%', color: 'amber' as const },
  { title: 'ROE', value: 11.8, target: 12, unit: '%', color: 'blue' as const },
  { title: 'NIM', value: 1.92, target: 1.85, min: 1, max: 3, unit: '%', color: 'green' as const },
  { title: 'CET1 Ratio', value: 12.4, target: 11.5, min: 8, max: 16, unit: '%', color: 'green' as const },
];
