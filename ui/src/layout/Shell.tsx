import Sidebar from './Sidebar';
import Header from './Header';

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#020617', color: '#e5e7eb' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <main style={{ padding: '24px' }}>{children}</main>
      </div>
    </div>
  );
}
