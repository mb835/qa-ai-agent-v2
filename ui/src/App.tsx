import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Prehled from './pages/Prehled';
import Scenare from './pages/Scenare';
import './styles/app.css';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: 40 }}>
          <Routes>
            <Route path="/" element={<Prehled />} />
            <Route path="/scenare" element={<Scenare />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
