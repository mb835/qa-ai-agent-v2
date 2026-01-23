// @ts-nocheck
import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {
  scenarioTrend,
  testTypeDistribution,
  testTypeColors,
} from "../mockData/dashboard";

const customTooltipStyle = {
  contentStyle: {
    backgroundColor: '#09090b',
    border: '1px solid #27272a',
    borderRadius: '10px',
    padding: '8px',
  },
  itemStyle: { color: '#fff', fontSize: '11px', fontWeight: 'bold' }
};

export function ScenarioTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <AreaChart data={scenarioTrend} margin={{ top: 5, right: 10, left: -35, bottom: 0 }}>
        <defs>
          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#18181b" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" stroke="#3f3f46" fontSize={9} tickLine={false} axisLine={false} />
        <YAxis stroke="#3f3f46" fontSize={9} tickLine={false} axisLine={false} />
        <Tooltip 
          contentStyle={customTooltipStyle.contentStyle} 
          itemStyle={customTooltipStyle.itemStyle}
          cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }}
          formatter={(value) => [value, "Počet"]} 
        />
        <Area
          type="monotone"
          dataKey="count"
          stroke="#6366f1"
          strokeWidth={2}
          fill="url(#colorCount)"
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function TestTypePieChart() {
  const [activeIndex, setActiveIndex] = useState(null);
  const total = testTypeDistribution.reduce((acc, curr) => acc + curr.value, 0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="relative w-full h-[180px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={testTypeDistribution}
            dataKey="value"
            nameKey="name"
            innerRadius={55}
            outerRadius={75}
            paddingAngle={4}
            stroke="none"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            animationBegin={0}
            animationDuration={1200}
          >
            {testTypeDistribution.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={testTypeColors[entry.name]} 
                style={{ 
                    filter: activeIndex === index ? `drop-shadow(0 0 8px ${testTypeColors[entry.name]})` : 'none',
                    transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Pie>
          <Tooltip content={<></>} />
          <Legend 
            verticalAlign="bottom" 
            formatter={(value) => <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest ml-1">{value}</span>}
            iconSize={6}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest leading-none">
          {activeIndex !== null ? testTypeDistribution[activeIndex].name : "Celkem"}
        </p>
        <p className="text-xl font-black text-white leading-none mt-1">
          {activeIndex !== null ? testTypeDistribution[activeIndex].value : total}
        </p>
      </div>
    </div>
  );
}