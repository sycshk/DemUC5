import React, { useState, useMemo } from 'react';
import { AppContextState, InputRow } from '../types';
import { INITIAL_INPUT_ROWS } from '../constants';
import { Save, Send, AlertCircle, History, X, Clock, User } from 'lucide-react';

interface PlanningInputProps {
  context: AppContextState;
}

interface HistoryEntry {
  id: string;
  timestamp: Date;
  author: string;
  totalRevenue: number;
  note?: string;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MIN_VALUE = 0;
const MAX_VALUE = 100000000; // 100M limit per cell for validation demo

export const PlanningInput: React.FC<PlanningInputProps> = ({ context }) => {
  const [data, setData] = useState(INITIAL_INPUT_ROWS);
  const [isSaving, setIsSaving] = useState(false);
  
  // History State
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([
    { 
        id: 'v-initial', 
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        author: 'System Admin', 
        totalRevenue: 165800,
        note: 'Initial Budget Load'
    },
    { 
        id: 'v-yesterday', 
        timestamp: new Date(Date.now() - 3600000 * 4), // 4 hours ago
        author: 'John Doe', 
        totalRevenue: 166800,
        note: 'Adjusted Q1 Targets'
    }
  ]);

  // Local editing state to support decimal typing and raw input
  const [editingLocation, setEditingLocation] = useState<{id: string, idx: number} | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  // If scenario is Actuals, read-only.
  const isReadOnly = context.scenario === 'Actuals';

  // Helper to validate a specific value
  const isValidValue = (val: number) => val >= MIN_VALUE && val <= MAX_VALUE;

  // Check if there are any errors in the entire dataset
  const totalErrors = useMemo(() => {
    let count = 0;
    data.forEach(row => {
      Object.values(row.values).forEach(val => {
        if (!isValidValue(val as number)) count++;
      });
    });
    return count;
  }, [data]);

  const updateDataRecursive = (rowId: string, monthIndex: number, numValue: number) => {
     setData(prev => {
      const newData = prev.map(r => ({
        ...r,
        values: { ...r.values }
      }));

      const rowIndex = newData.findIndex(r => r.id === rowId);
      if (rowIndex === -1) return prev;

      // 1. Update the target cell
      newData[rowIndex].values[monthIndex] = numValue;

      // 2. Recursively update parent rows
      let currentLevel = newData[rowIndex].level;

      for (let i = rowIndex - 1; i >= 0; i--) {
        const potentialParent = newData[i];
        
        if (potentialParent.level < currentLevel) {
          const parentIndex = i;
          const parentRow = newData[parentIndex];

          let newParentSum = 0;
          for (let j = parentIndex + 1; j < newData.length; j++) {
            const childRow = newData[j];
            if (childRow.level <= parentRow.level) break;
            
            if (childRow.level === parentRow.level + 1) {
              newParentSum += childRow.values[monthIndex] || 0;
            }
          }

          newData[parentIndex].values[monthIndex] = newParentSum;
          currentLevel = parentRow.level;
        }
      }

      return newData;
    });
  }

  const handleCellChange = (rowId: string, monthIndex: number, newValue: string) => {
    if (isReadOnly) return;

    if (!/^\d*\.?\d*$/.test(newValue)) return;

    setEditValue(newValue);

    const cleanValue = newValue === '' ? '0' : newValue;
    const numValue = parseFloat(cleanValue);
    
    if (!isNaN(numValue)) {
        updateDataRecursive(rowId, monthIndex, numValue);
    }
  };

  const handleFocus = (rowId: string, monthIdx: number, currentValue: number) => {
    if (isReadOnly) return;
    setEditingLocation({ id: rowId, idx: monthIdx });
    setEditValue(currentValue === 0 ? '' : currentValue.toString());
  };

  const handleBlur = () => {
    setEditingLocation(null);
    setEditValue('');
  };

  const handleSave = () => {
    if (totalErrors > 0) {
        alert("Please fix validation errors before saving.");
        return;
    }
    setIsSaving(true);
    
    // Simulate API save and history creation
    setTimeout(() => {
        const totalRevenue = Object.values(data[0].values).reduce((a: number, b: number) => a + b, 0);
        const newEntry: HistoryEntry = {
            id: `v-${Date.now()}`,
            timestamp: new Date(),
            author: 'John Doe',
            totalRevenue: totalRevenue,
            note: 'Manual Save'
        };
        setHistory(prev => [newEntry, ...prev]);
        setIsSaving(false);
    }, 800);
  };

  const isParentRow = (index: number, rows: InputRow[]) => {
    if (index >= rows.length - 1) return false;
    return rows[index + 1].level > rows[index].level;
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Toolbar */}
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-10">
        <div>
           <h3 className="font-bold text-slate-800">Revenue Planning Grid</h3>
           <div className="flex items-center gap-2 mt-1">
             <p className="text-sm text-slate-500">
               {context.year} {context.scenario} • {context.market}
             </p>
             {isReadOnly && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">Read Only</span>}
             {totalErrors > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700 animate-pulse">
                    <AlertCircle size={12} />
                    {totalErrors} Error{totalErrors > 1 ? 's' : ''} Found
                </span>
             )}
           </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowHistory(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            <History size={16} />
            History
          </button>
          <div className="w-px h-8 bg-slate-200 mx-1"></div>
          <button 
            disabled={isReadOnly || totalErrors > 0}
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${isReadOnly || totalErrors > 0
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                    : 'bg-white border border-swire-blue text-swire-blue hover:bg-blue-50'
                }`}
            title={totalErrors > 0 ? "Fix errors to save" : ""}
          >
            <Save size={16} />
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
          <button 
            disabled={isReadOnly || totalErrors > 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm
                ${isReadOnly || totalErrors > 0
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                    : 'bg-coke-red text-white hover:bg-red-700'
                }`}
          >
            <Send size={16} />
            Submit
          </button>
        </div>
      </div>

      {/* Grid Container */}
      <div className="flex-1 overflow-auto custom-scrollbar p-6 bg-neutral-bg">
        <div className="bg-white border border-slate-300 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-300">
                            <th className="sticky left-0 z-10 bg-slate-50 px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider min-w-[200px] border-r border-slate-300 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
                                Account
                            </th>
                            {MONTHS.map((m) => (
                                <th key={m} className="px-2 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider min-w-[100px] border-r border-slate-200 last:border-r-0">
                                    {m}
                                </th>
                            ))}
                            <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider min-w-[100px] bg-slate-100">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white font-mono text-sm">
                        {data.map((row, idx) => {
                            const total = Object.values(row.values).reduce((a: number, b: number) => a + b, 0);
                            const isParent = isParentRow(idx, data);
                            const isCalculated = row.isTotal || isParent;
                            const isDisabled = isReadOnly || isCalculated;

                            return (
                                <tr key={row.id} className="group hover:bg-blue-50/30">
                                    <td className="sticky left-0 z-10 bg-white group-hover:bg-blue-50/30 px-4 py-2 border-b border-r border-slate-200 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] font-sans">
                                        <div style={{ paddingLeft: `${row.level * 1.5}rem` }} className={`flex items-center ${isCalculated ? 'font-bold text-slate-800' : 'text-slate-600'}`}>
                                            {row.account}
                                        </div>
                                    </td>
                                    {MONTHS.map((_, monthIdx) => {
                                        const cellValue = row.values[monthIdx];
                                        const isEditing = editingLocation?.id === row.id && editingLocation?.idx === monthIdx;
                                        
                                        // Visual Validation
                                        const isValid = isValidValue(cellValue);
                                        const displayValue = isEditing ? editValue : cellValue.toLocaleString();
                                        
                                        // Error Styling
                                        const errorClass = !isValid ? 'bg-red-50 text-red-700 border-red-500 focus:ring-red-500' : '';
                                        const errorTitle = !isValid ? `Value must be between ${MIN_VALUE} and ${MAX_VALUE.toLocaleString()}` : '';

                                        return (
                                            <td key={monthIdx} className={`p-0 border-b border-r border-slate-200 relative ${isDisabled ? 'bg-slate-50' : ''}`}>
                                                <input
                                                    type="text"
                                                    disabled={isDisabled}
                                                    value={displayValue}
                                                    onFocus={() => handleFocus(row.id, monthIdx, cellValue)}
                                                    onBlur={handleBlur}
                                                    onChange={(e) => handleCellChange(row.id, monthIdx, e.target.value)}
                                                    title={errorTitle}
                                                    className={`w-full h-full px-2 py-2 text-right focus:outline-none focus:ring-2 focus:ring-inset focus:ring-swire-blue bg-transparent transition-colors
                                                        ${isCalculated ? 'font-bold text-slate-800' : ''}
                                                        ${!isDisabled && isValid ? 'text-slate-600 hover:bg-blue-50' : ''}
                                                        ${isDisabled ? 'cursor-default' : ''}
                                                        ${errorClass}
                                                    `}
                                                />
                                                {!isValid && !isEditing && (
                                                    <div className="absolute top-0 right-0 p-0.5">
                                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    })}
                                    <td className="px-4 py-2 border-b border-slate-200 text-right font-bold text-slate-800 bg-slate-50">
                                        {total.toLocaleString()}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
      </div>

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Version History</h3>
                        <p className="text-xs text-slate-500">Recent saves and changes</p>
                    </div>
                    <button 
                        onClick={() => setShowHistory(false)}
                        className="text-slate-400 hover:text-slate-700 transition-colors p-1 hover:bg-slate-200 rounded-full"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-0">
                    {history.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">No history available</div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {history.map((entry, index) => (
                                <div key={entry.id} className="p-4 hover:bg-slate-50 transition-colors group">
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="flex items-center gap-2">
                                            <span className={`flex items-center justify-center w-8 h-8 rounded-full ${index === 0 ? 'bg-blue-100 text-swire-blue' : 'bg-slate-100 text-slate-500'}`}>
                                                <Clock size={16} />
                                            </span>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">
                                                    {entry.note || 'Save Point'}
                                                    {index === 0 && <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide">Current</span>}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <span>{formatTime(entry.timestamp)}</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <User size={10} />
                                                        {entry.author}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-mono font-medium text-slate-700">
                                                {entry.totalRevenue.toLocaleString()}
                                            </p>
                                            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Total Revenue</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 text-right">
                    <button 
                        onClick={() => setShowHistory(false)}
                        className="px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};