import React from 'react';
import { LayoutDashboard, FileSpreadsheet, FileBarChart, DatabaseZap } from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'input', label: 'Planning Input', icon: FileSpreadsheet },
    { id: 'reports', label: 'Reports', icon: FileBarChart },
    { id: 'integration', label: 'Data Integration', icon: DatabaseZap },
  ];

  return (
    <div className="w-64 bg-swire-blue text-white flex flex-col h-screen fixed left-0 top-0 shadow-xl z-20">
      <div className="p-6 border-b border-swire-dark flex items-center gap-3">
        <div className="w-8 h-8 bg-coke-red rounded-full flex items-center justify-center font-bold text-white">
          S
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight">Swire Coca-Cola</h1>
          <p className="text-xs text-blue-200 uppercase tracking-wider">FP&A Platform</p>
        </div>
      </div>
      
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id as Page)}
                  className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors duration-200 border-l-4
                    ${isActive 
                      ? 'bg-swire-dark border-coke-red text-white' 
                      : 'border-transparent text-blue-100 hover:bg-swire-dark/50 hover:text-white'
                    }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-6 border-t border-swire-dark">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-200 text-swire-blue flex items-center justify-center text-xs font-bold">
            JD
          </div>
          <div className="text-xs">
            <p className="font-medium text-white">John Doe</p>
            <p className="text-blue-300">Finance Director</p>
          </div>
        </div>
      </div>
    </div>
  );
};