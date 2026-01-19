import { motion } from "framer-motion";

type Props = {
  title: string;
  value: string | number;
  trend?: string;
};

export default function StatCard({ title, value, trend }: Props) {
  const isPositive = trend?.startsWith('+');

  return (
    <div className="relative group overflow-hidden bg-zinc-900/40 border border-white/5 rounded-2xl p-4 transition-all duration-300 hover:border-indigo-500/30 text-left">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex justify-between items-start mb-2 relative z-10">
        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em]">{title}</p>
        {trend && (
          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm ${
            isPositive 
                ? 'bg-emerald-500/10 text-emerald-400 shadow-emerald-500/20' 
                : 'bg-rose-500/10 text-rose-400 shadow-rose-500/20'
          }`}
          style={{ boxShadow: isPositive ? '0 0 8px rgba(52, 211, 153, 0.15)' : '0 0 8px rgba(251, 113, 133, 0.15)' }}
          >
            {trend}
          </span>
        )}
      </div>
      
      <div className="relative z-10">
        <p className="text-3xl font-bold text-white tracking-tighter leading-none">{value}</p>
      </div>
    </div>
  );
}