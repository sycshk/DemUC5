import React from 'react';
import { KPIItem } from '../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  item: KPIItem;
}

export const KPICard: React.FC<KPICardProps> = ({ item }) => {
  const isPositive = item.variance > 0;
  const isNeutral = item.variance === 0;
  
  // Logic: Generally positive variance is Green, but for OpEx (if explicitly handled) positive variance is bad.
  // For simplicity, we assume positive variance > 0 is green unless it is OpEx.
  const isExpense = item.label === 'Operating Expenses';
  const isGood = isExpense ? item.variance < 0 : item.variance > 0;
  
  const colorClass = isGood ? 'text-emerald-600' : 'text-coke-red';
  const Icon = item.variance === 0 ? Minus : (item.variance > 0 ? TrendingUp : TrendingDown);

  return (
    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">{item.label}</h3>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold text-slate-800 tracking-tight">{item.value}</div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-opacity-10 ${isGood ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
           <Icon size={12} strokeWidth={3} />
           <span>{Math.abs(item.variance)}%</span>
        </div>
      </div>
      <div className="mt-2 text-xs text-slate-400">vs Previous Year</div>
    </div>
  );
};