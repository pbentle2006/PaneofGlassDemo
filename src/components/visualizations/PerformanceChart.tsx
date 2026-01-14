/**
 * PerformanceChart Component - Line/Bar charts for performance metrics
 */

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';

interface DataPoint {
  name: string;
  value: number;
  target?: number;
  previousPeriod?: number;
  [key: string]: string | number | undefined;
}

interface PerformanceChartProps {
  data: DataPoint[];
  title?: string;
  type?: 'line' | 'bar';
  color?: string;
  showTarget?: boolean;
  showComparison?: boolean;
  height?: number;
  valueFormatter?: (value: number) => string;
  yAxisLabel?: string;
}

export function PerformanceChart({
  data,
  title,
  type = 'line',
  color = '#DA1710',  // Westpac Crimson as default
  showTarget = false,
  showComparison = false,
  height = 250,
  valueFormatter = (v) => v.toLocaleString(),
  yAxisLabel,
}: PerformanceChartProps) {
  const ChartComponent = type === 'line' ? LineChart : BarChart;

  // Calculate average for reference line
  const avgValue = data.reduce((sum, d) => sum + d.value, 0) / data.length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {title && (
        <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <ChartComponent data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
            tickFormatter={valueFormatter}
            label={
              yAxisLabel
                ? {
                    value: yAxisLabel,
                    angle: -90,
                    position: 'insideLeft',
                    style: { fontSize: 12, fill: '#6b7280' },
                  }
                : undefined
            }
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              valueFormatter(value),
              name === 'value' ? 'Current' : name === 'target' ? 'Target' : 'Previous',
            ]}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          />
          {(showTarget || showComparison) && <Legend />}

          <ReferenceLine
            y={avgValue}
            stroke="#9ca3af"
            strokeDasharray="5 5"
            label={{
              value: 'Avg',
              position: 'right',
              fill: '#9ca3af',
              fontSize: 10,
            }}
          />

          {type === 'line' ? (
            <>
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="Current"
              />
              {showTarget && (
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Target"
                />
              )}
              {showComparison && (
                <Line
                  type="monotone"
                  dataKey="previousPeriod"
                  stroke="#9ca3af"
                  strokeWidth={1}
                  dot={false}
                  name="Previous"
                />
              )}
            </>
          ) : (
            <>
              <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} name="Current" />
              {showTarget && (
                <Bar dataKey="target" fill="#10b981" radius={[4, 4, 0, 0]} name="Target" />
              )}
            </>
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}

// Demo data for branch performance
export const BRANCH_WEEKLY_DATA: DataPoint[] = [
  { name: 'Mon', value: 45, target: 50, previousPeriod: 42 },
  { name: 'Tue', value: 52, target: 50, previousPeriod: 48 },
  { name: 'Wed', value: 48, target: 50, previousPeriod: 45 },
  { name: 'Thu', value: 61, target: 50, previousPeriod: 52 },
  { name: 'Fri', value: 55, target: 50, previousPeriod: 49 },
];

// Demo data for quarterly revenue
export const QUARTERLY_REVENUE_DATA: DataPoint[] = [
  { name: 'Q1', value: 2.4, target: 2.5 },
  { name: 'Q2', value: 2.8, target: 2.7 },
  { name: 'Q3', value: 3.1, target: 2.9 },
  { name: 'Q4', value: 3.4, target: 3.2 },
];
