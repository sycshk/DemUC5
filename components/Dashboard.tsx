import React from 'react';
import { KPIS, REVENUE_TREND_DATA, PNL_SUMMARY } from '../constants';
import { KPICard } from './KPICard';
import { RevenueChart } from './Chart';
import { DataTable } from './DataTable';

export const Dashboard: React.FC = () => {
  return (
    <div className="p-8 h-full flex flex-col gap-6 overflow-y-auto custom-scrollbar">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPIS.map((kpi, idx) => (
            <KPICard key={idx} item={kpi} />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[500px]">
        {/* Chart Section - Takes up 2/3 width on large screens */}
        <div className="lg:col-span-2 min-h-[400px]">
            <RevenueChart data={REVENUE_TREND_DATA} />
        </div>
        
        {/* Table Section - Takes up 1/3 width */}
        <div className="lg:col-span-1 min-h-[400px]">
            <DataTable data={PNL_SUMMARY} />
        </div>
      </div>
      
      {/* Bottom padding for scroll */}
      <div className="h-8"></div>
    </div>
  );
};