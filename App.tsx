import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/Dashboard';
import { PlanningInput } from './components/PlanningInput';
import { AppContextState, Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [context, setContext] = useState<AppContextState>({
    market: 'Hong Kong',
    year: '2025',
    scenario: 'Budget',
  });

  const handleContextChange = (newContext: Partial<AppContextState>) => {
    setContext(prev => ({ ...prev, ...newContext }));
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'input':
        return <PlanningInput context={context} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-xl font-semibold">Under Construction</h2>
            <p>The {currentPage} module is coming soon.</p>
          </div>
        );
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
        case 'dashboard': return 'Executive Dashboard';
        case 'input': return 'Planning Input';
        case 'reports': return 'Financial Reports';
        case 'integration': return 'Data Integration';
        default: return '';
    }
  }

  return (
    <div className="flex h-screen bg-neutral-bg">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <TopBar 
            context={context} 
            onContextChange={handleContextChange} 
            title={getPageTitle()}
        />
        
        <main className="flex-1 overflow-hidden relative">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;