import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area
} from 'recharts';
import { ChartDataPoint } from '../types';

interface ChartProps {
  data: ChartDataPoint[];
}

export const RevenueChart: React.FC<ChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-slate-800">Revenue Trend: Actual vs Budget</h3>
        <div className="flex gap-4 text-xs">
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-swire-blue rounded-sm"></span>
                <span className="text-slate-600">Actual ($M)</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-coke-red rounded-full"></span>
                <span className="text-slate-600">Budget ($M)</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 border border-slate-400 border-dashed bg-slate-100 rounded-sm"></span>
                <span className="text-slate-600">Variance (%)</span>
             </div>
        </div>
      </div>
      
      {/* Fixed height container to prevent Recharts warning about 0/negative dimensions */}
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#64748B', fontSize: 12}} 
                dy={10}
            />
            {/* Primary Axis for Revenue */}
            <YAxis 
                yAxisId="left" 
                orientation="left" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#64748B', fontSize: 12}}
                tickFormatter={(value) => `$${value}M`}
            />
            {/* Secondary Axis for Variance % */}
            <YAxis 
                yAxisId="right" 
                orientation="right" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94A3B8', fontSize: 11}}
                tickFormatter={(value) => `${value}%`}
            />
            
            <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ fill: '#F8FAFC' }}
            />

            <Bar 
                yAxisId="left"
                dataKey="actual" 
                fill="#00578A" 
                barSize={20} 
                radius={[4, 4, 0, 0]}
                name="Actual Revenue"
            />
            <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="budget" 
                stroke="#F40009" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#F40009', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 6 }}
                name="Budget Revenue"
            />
            {/* Dashed line for variance to show trend, purely visual aid */}
             <Area
                yAxisId="right"
                type="monotone"
                dataKey="variance"
                fill="#CBD5E1"
                stroke="#94A3B8"
                strokeDasharray="5 5"
                fillOpacity={0.1}
                name="Variance %"
             />

          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};