import React from 'react';
import { AppContextState, Market, Scenario, Year } from '../types';
import { ChevronDown, Globe, Calendar, Layers } from 'lucide-react';

interface TopBarProps {
  context: AppContextState;
  onContextChange: (newContext: Partial<AppContextState>) => void;
  title: string;
}

export const TopBar: React.FC<TopBarProps> = ({ context, onContextChange, title }) => {
  return (
    <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      
      <div className="flex items-center gap-4">
        {/* Market Selector */}
        <div className="relative group">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md cursor-pointer hover:border-swire-blue transition-colors">
                <Globe size={14} className="text-slate-500" />
                <span className="text-sm font-medium text-slate-700">{context.market}</span>
                <ChevronDown size={14} className="text-slate-400" />
            </div>
            {/* Simple Dropdown Logic simulation via hover for demo, normally would use state */}
            <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-slate-200 rounded shadow-lg hidden group-hover:block animate-in fade-in zoom-in-95 duration-200">
                {['Hong Kong', 'Taiwan', 'USA', 'Mainland China'].map(m => (
                    <div 
                        key={m} 
                        className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer"
                        onClick={() => onContextChange({ market: m as Market })}
                    >
                        {m}
                    </div>
                ))}
            </div>
        </div>

        {/* Year Selector */}
        <div className="relative group">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md cursor-pointer hover:border-swire-blue transition-colors">
                <Calendar size={14} className="text-slate-500" />
                <span className="text-sm font-medium text-slate-700">{context.year}</span>
                <ChevronDown size={14} className="text-slate-400" />
            </div>
             <div className="absolute top-full right-0 mt-1 w-24 bg-white border border-slate-200 rounded shadow-lg hidden group-hover:block animate-in fade-in zoom-in-95 duration-200">
                {['2024', '2025', '2026'].map(y => (
                    <div 
                        key={y} 
                        className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer"
                        onClick={() => onContextChange({ year: y as Year })}
                    >
                        {y}
                    </div>
                ))}
            </div>
        </div>

        {/* Scenario Selector */}
        <div className="relative group">
            <div className={`flex items-center gap-2 px-3 py-1.5 border rounded-md cursor-pointer transition-colors ${context.scenario === 'Budget' ? 'bg-blue-50 border-swire-blue' : 'bg-slate-50 border-slate-200'}`}>
                <Layers size={14} className={context.scenario === 'Budget' ? 'text-swire-blue' : 'text-slate-500'} />
                <span className={`text-sm font-medium ${context.scenario === 'Budget' ? 'text-swire-blue' : 'text-slate-700'}`}>{context.scenario}</span>
                <ChevronDown size={14} className="text-slate-400" />
            </div>
             <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-slate-200 rounded shadow-lg hidden group-hover:block animate-in fade-in zoom-in-95 duration-200">
                {['Actuals', 'Budget'].map(s => (
                    <div 
                        key={s} 
                        className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer"
                        onClick={() => onContextChange({ scenario: s as Scenario })}
                    >
                        {s}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};