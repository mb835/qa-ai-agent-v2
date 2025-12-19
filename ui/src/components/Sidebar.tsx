import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>🤖 QA AI Agent</h2>
      <div className="nav">
        <NavLink to="/" end>Přehled</NavLink>
        <NavLink to="/scenare">Scénáře</NavLink>
      </div>
    </aside>
  );
}
