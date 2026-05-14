import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AnalyzeNews from './pages/AnalyzeNews';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Signup from './pages/Signup';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<AnalyzeNews />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="history" element={<History />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
