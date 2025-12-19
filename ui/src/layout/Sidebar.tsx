export default function Sidebar() {
  return (
    <aside style={{
      width: 220,
      background: '#020617',
      borderRight: '1px solid #1e293b',
      padding: 16
    }}>
      <h2 style={{ marginBottom: 24 }}>🤖 QA AI Agent</h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <a>📊 Přehled</a>
        <a>🧪 Scénáře</a>
        <a>🤖 Generování testů</a>
        <a>🧱 Page Objecty</a>
        <a>⚙️ Nastavení</a>
      </nav>
    </aside>
  );
}
