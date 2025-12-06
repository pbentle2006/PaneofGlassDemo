/**
 * SpendingChart Component - Visualizes spending by category
 */

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

interface SpendingCategory {
  name: string;
  value: number;
  color: string;
}

interface SpendingChartProps {
  data: SpendingCategory[];
  title?: string;
  showLegend?: boolean;
  height?: number;
}

const RADIAN = Math.PI / 180;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function SpendingChart({
  data,
  title,
  showLegend = true,
  height = 250,
}: SpendingChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {title && (
        <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data as unknown as Array<Record<string, unknown>>}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            innerRadius={40}
            dataKey="value"
            strokeWidth={2}
            stroke="#fff"
          >
            {data.map((item, index) => (
              <Cell key={`cell-${index}`} fill={item.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [
              `$${value.toLocaleString()}`,
              'Amount',
            ]}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          />
          {showLegend && (
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              formatter={(value) => {
                const item = data.find((d) => d.name === value);
                const percentage = item ? ((item.value / total) * 100).toFixed(1) : 0;
                return (
                  <span className="text-sm text-gray-700">
                    {value} ({percentage}%)
                  </span>
                );
              }}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Pre-configured spending data for demo
export const DEMO_SPENDING_DATA: SpendingCategory[] = [
  { name: 'Housing', value: 2800, color: '#3b82f6' },
  { name: 'Food & Dining', value: 1200, color: '#10b981' },
  { name: 'Transportation', value: 650, color: '#f59e0b' },
  { name: 'Utilities', value: 380, color: '#8b5cf6' },
  { name: 'Entertainment', value: 420, color: '#ec4899' },
  { name: 'Shopping', value: 580, color: '#06b6d4' },
  { name: 'Other', value: 470, color: '#6b7280' },
];
