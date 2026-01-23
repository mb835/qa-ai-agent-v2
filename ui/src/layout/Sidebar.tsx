import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCheckSquare,
  FaPlay,
  FaCogs,
  FaCloud,
  FaEye,
  FaChartBar,
  FaSlidersH,
  FaBrain,
} from "react-icons/fa";

const menu = [
  { label: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
  { label: "Testovací scénáře", icon: <FaCheckSquare />, path: "/scenarios" },
  { label: "Spuštění testů", icon: <FaPlay />, path: "/runs" },
  { label: "CI / CD", icon: <FaCogs />, path: "/cicd" },
  { label: "Cloud testing", icon: <FaCloud />, path: "/cloud" },
  { label: "Vizuální testy", icon: <FaEye />, path: "/visual" },
  { label: "Reporty", icon: <FaChartBar />, path: "/reports" },
  { label: "Nastavení", icon: <FaSlidersH />, path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-[#0b1220] to-[#060b18] text-white border-r border-white/10">
      
      {/* ===== HEADER ===== */}
      <div className="px-6 py-5 flex items-center gap-3 border-b border-white/10">
        <div className="relative">
          <FaBrain className="text-indigo-400 text-xl relative z-10" />
          <span className="absolute inset-0 bg-indigo-500 blur-md opacity-60 rounded-full" />
        </div>

        <span className="text-base font-semibold tracking-wide bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          QA Thinking Engine
        </span>
      </div>

      {/* ===== MENU ===== */}
      <nav className="mt-4 flex flex-col gap-1 px-3">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `
              flex items-center gap-3 px-4 py-3 rounded-lg text-sm
              transition-all duration-200
              ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }
            `
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
