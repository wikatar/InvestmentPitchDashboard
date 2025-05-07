import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/layout/Layout';
import LoadingScreen from './components/common/LoadingScreen';

// Lazy loaded components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Strategies = lazy(() => import('./pages/Strategies'));
const StrategyDetail = lazy(() => import('./pages/StrategyDetail'));
const StrategyCreate = lazy(() => import('./pages/StrategyCreate'));
const Portfolios = lazy(() => import('./pages/Portfolios'));
const PortfolioDetail = lazy(() => import('./pages/PortfolioDetail'));
const PortfolioCreate = lazy(() => import('./pages/PortfolioCreate'));
const Accounts = lazy(() => import('./pages/Accounts'));
const AccountDetail = lazy(() => import('./pages/AccountDetail'));
const Investments = lazy(() => import('./pages/Markets'));
const MarketDetail = lazy(() => import('./pages/MarketDetail'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Settings = lazy(() => import('./pages/Settings'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  // For now, let's assume the user is authenticated
  const isAuthenticated = true;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          
          <Route path="/strategies">
            <Route index element={<Strategies />} />
            <Route path="create" element={<StrategyCreate />} />
            <Route path=":id" element={<StrategyDetail />} />
          </Route>
          
          <Route path="/portfolios">
            <Route index element={<Portfolios />} />
            <Route path="create" element={<PortfolioCreate />} />
            <Route path=":id" element={<PortfolioDetail />} />
          </Route>
          
          <Route path="/accounts">
            <Route index element={<Accounts />} />
            <Route path=":id" element={<AccountDetail />} />
          </Route>
          
          <Route path="/markets">
            <Route index element={<Investments />} />
            <Route path=":id" element={<MarketDetail />} />
          </Route>
          
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App; 