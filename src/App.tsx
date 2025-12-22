import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import DashboardPage from "./dashboard/DashboardPage";

export default function App() {
  return (
    <div className="h-screen flex bg-gray-100 text-gray-900">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <TopBar />

        <main className="flex-1 p-6 overflow-auto">
          <DashboardPage />
        </main>
      </div>
    </div>
  );
}
