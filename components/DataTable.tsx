import React from 'react';
import { PnLRow } from '../types';

interface DataTableProps {
  data: PnLRow[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="px-6 py-4 border-b border-slate-200">
        <h3 className="font-semibold text-slate-800">P&L Summary (YTD)</h3>
      </div>
      <div className="flex-1 overflow-auto custom-scrollbar">
        <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200 sticky top-0">
                <tr>
                    <th className="px-6 py-3">Account</th>
                    <th className="px-6 py-3 text-right">Actual</th>
                    <th className="px-6 py-3 text-right">Budget</th>
                    <th className="px-6 py-3 text-right">Var $</th>
                    <th className="px-6 py-3 text-right">Var %</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
                {data.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 font-sans text-slate-700">
                            <span style={{ paddingLeft: `${row.indent * 1.5}rem` }} className={row.indent === 0 ? 'font-semibold' : ''}>
                                {row.category}
                            </span>
                        </td>
                        <td className="px-6 py-3 text-right text-slate-600">{row.actual.toFixed(1)}</td>
                        <td className="px-6 py-3 text-right text-slate-600">{row.budget.toFixed(1)}</td>
                        <td className={`px-6 py-3 text-right font-medium ${row.variance >= 0 ? 'text-emerald-600' : 'text-coke-red'}`}>
                            {row.variance > 0 ? '+' : ''}{row.variance.toFixed(1)}
                        </td>
                         <td className={`px-6 py-3 text-right font-medium ${row.variancePct >= 0 ? 'text-emerald-600' : 'text-coke-red'}`}>
                            {row.variancePct > 0 ? '+' : ''}{row.variancePct.toFixed(1)}%
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};