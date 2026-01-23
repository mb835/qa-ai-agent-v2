import { FaClipboardCheck, FaChartLine, FaChartPie } from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import { ScenarioTrendChart, TestTypePieChart } from "./DashboardCharts";
import StatCard from "../components/StatCard";
import { dashboardStats } from "../mockData/dashboard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function DashboardPage() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative px-10 py-5 bg-[#030303] min-h-screen text-zinc-100 overflow-hidden text-left"
    >
      {/* Dekorativní ambientní záře */}
      <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-rose-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-5">

        {/* HEADER */}
        <motion.div variants={itemVariants} className="flex justify-between items-end border-b border-white/5 pb-3">
          <div className="space-y-0.5">
            <h1 className="text-3xl font-[1000] tracking-[-0.05em] text-white leading-none uppercase">QA Thinking Engine</h1>
            <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.4em]">AI-Powered Quality Intelligence</p>
          </div>
        </motion.div>

        {/* KPI SEKCÍ */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <StatCard title="Scénáře" value={dashboardStats.totalScenarios} trend="+4" />
          <StatCard title="Testovací případy" value={dashboardStats.totalTestCases} trend="+28" />
          <StatCard title="Aktivita" value={dashboardStats.executedLast30d} />
          <StatCard title="Úspěšnost" value={`${dashboardStats.passRate}%`} trend="+1.2%" />
          <StatCard title="Automatizace" value={`${dashboardStats.automationCoverage}%`} />
        </motion.div>

        {/* POSLEDNÍ QA ANALÝZA (bez Feed Termínálu) */}
        <motion.div variants={itemVariants} className="relative group">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500/20 to-transparent rounded-xl opacity-50 transition-opacity group-hover:opacity-100"></div>
          <div className="relative rounded-xl bg-zinc-900/40 border border-white/10 backdrop-blur-md p-5 overflow-hidden">
            {/* Profesionální akcentní proužek */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
            
            <h3 className="font-bold flex items-center gap-2 text-white text-base uppercase tracking-tighter mb-4 ml-1">
              <div className="p-1.5 bg-indigo-500/20 rounded-md ring-1 ring-indigo-500/50">
                <FaClipboardCheck className="text-indigo-400 text-base" />
              </div>
              Poslední QA analýza
            </h3>

            <div className="grid md:grid-cols-2 gap-8 ml-1">
              <div className="space-y-0.5">
                <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest text-left">Záměr testování</p>
                <p className="text-white text-sm font-semibold text-left">Otestuj nákupní proces notebooku</p>
              </div>
              <div className="space-y-0.5 text-left">
                <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest text-left">Časová značka</p>
                <p className="text-zinc-300 text-sm font-semibold text-left">
                  31. 12. 2025 <span className="text-zinc-500 ml-2 font-normal text-xs">18:50</span>
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
              <button className="px-4 py-1 text-[9px] text-zinc-400 border border-zinc-800 rounded-full hover:border-indigo-500 hover:text-white hover:bg-indigo-500/10 transition-all font-bold tracking-widest uppercase">
                DETAILNÍ LOGY →
              </button>
            </div>
          </div>
        </motion.div>

        {/* GRAFY */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm p-4 hover:border-indigo-500/20 transition-all group">
            <h3 className="text-[9px] font-black uppercase tracking-[0.2em] mb-4 text-zinc-500 flex items-center gap-2">
              <FaChartLine className="group-hover:text-indigo-400 transition-colors" /> Vývoj scénářů
            </h3>
            <ScenarioTrendChart />
          </div>

          <div className="rounded-xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm p-4 hover:border-rose-500/20 transition-all group">
            <h3 className="text-[9px] font-black uppercase tracking-[0.2em] mb-4 text-zinc-500 flex items-center gap-2">
              <FaChartPie className="group-hover:text-rose-400 transition-colors" /> Typologie testů
            </h3>
            <TestTypePieChart />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}