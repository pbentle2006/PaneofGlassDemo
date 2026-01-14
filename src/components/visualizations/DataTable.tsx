/**
 * DataTable Component - Sortable, styled data tables
 */

import { useState } from 'react';
import { ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react';

interface Column<T> {
  key: keyof T;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  maxRows?: number;
  compact?: boolean;
  striped?: boolean;
  highlightRow?: (row: T) => boolean;
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  title,
  maxRows,
  compact = false,
  striped = true,
  highlightRow,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (aVal === bVal) return 0;
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;
    const comparison = aVal < bVal ? -1 : 1;
    return sortDir === 'asc' ? comparison : -comparison;
  });

  const displayData = maxRows ? sortedData.slice(0, maxRows) : sortedData;

  const cellPadding = compact ? 'px-3 py-1.5' : 'px-4 py-2.5';

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {title && (
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`${cellPadding} text-xs font-semibold text-gray-600 uppercase tracking-wider ${
                    col.align === 'right'
                      ? 'text-right'
                      : col.align === 'center'
                      ? 'text-center'
                      : 'text-left'
                  } ${col.sortable !== false ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                  style={{ width: col.width }}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {col.sortable !== false && (
                      <span className="text-gray-400">
                        {sortKey === col.key ? (
                          sortDir === 'asc' ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )
                        ) : (
                          <ArrowUpDown className="w-3 h-3 opacity-50" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {displayData.map((row, idx) => {
              const isHighlighted = highlightRow?.(row);
              return (
                <tr
                  key={idx}
                  className={`
                    ${striped && idx % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'}
                    ${isHighlighted ? 'bg-red-50 border-l-2 border-l-[#DA1710]' : ''}
                    hover:bg-gray-50 transition-colors
                  `}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={`${cellPadding} text-sm text-gray-700 ${
                        col.align === 'right'
                          ? 'text-right'
                          : col.align === 'center'
                          ? 'text-center'
                          : 'text-left'
                      }`}
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key] ?? '-')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {maxRows && data.length > maxRows && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-center">
          <span className="text-xs text-gray-500">
            Showing {maxRows} of {data.length} rows
          </span>
        </div>
      )}
    </div>
  );
}

// Demo transaction data
export interface Transaction {
  date: string;
  description: string;
  category: string;
  amount: number;
  balance: number;
}

export const DEMO_TRANSACTIONS: Transaction[] = [
  { date: '2024-01-15', description: 'Woolworths Metro', category: 'Groceries', amount: -87.45, balance: 4521.55 },
  { date: '2024-01-14', description: 'Shell Service Station', category: 'Transport', amount: -65.00, balance: 4609.00 },
  { date: '2024-01-14', description: 'Netflix Subscription', category: 'Entertainment', amount: -22.99, balance: 4674.00 },
  { date: '2024-01-13', description: 'Salary Deposit', category: 'Income', amount: 5250.00, balance: 4696.99 },
  { date: '2024-01-12', description: 'Amazon.com.au', category: 'Shopping', amount: -156.78, balance: -553.01 },
];

// Demo competitor data for CFO
export interface CompetitorData {
  bank: string;
  cti: number;
  roe: number;
  nim: number;
  marketShare: number;
}

// Westpac competitor comparison data
export const COMPETITOR_TABLE_DATA: CompetitorData[] = [
  { bank: 'Westpac', cti: 52.3, roe: 11.8, nim: 1.92, marketShare: 18.1 },
  { bank: 'CBA', cti: 47.2, roe: 14.1, nim: 2.05, marketShare: 25.8 },
  { bank: 'NAB', cti: 51.8, roe: 11.2, nim: 1.78, marketShare: 18.4 },
  { bank: 'ANZ', cti: 53.1, roe: 10.8, nim: 1.68, marketShare: 17.2 },
  { bank: 'Macquarie', cti: 48.5, roe: 12.8, nim: 1.95, marketShare: 8.2 },
];
