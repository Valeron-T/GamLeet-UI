import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from './components/theme-provider.tsx';
import { StatsProvider } from './contexts/StatsContext';
import { LoginForm } from './components/login-form.tsx';

import { Suspense, lazy } from 'react';

import { LoadingScreen } from './components/loading-screen.tsx';

const Home = lazy(() => import('./app/dashboard/home.tsx'));
const Settings = lazy(() => import('./app/dashboard/settings.tsx'));
const Analytics = lazy(() => import('./app/dashboard/analytics.tsx'));
const Store = lazy(() => import('./app/dashboard/store.tsx'));
const RiskParameters = lazy(() => import('./app/dashboard/risk-parameters.tsx'));
const Help = lazy(() => import('./app/dashboard/help'));
const Integrations = lazy(() => import('./app/dashboard/integrations.tsx'));
const Inventory = lazy(() => import('./app/dashboard/inventory.tsx'));
const Leaderboard = lazy(() => import('./app/dashboard/leaderboard.tsx'));


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

      <StatsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/dashboard" element={
              <Suspense fallback={<LoadingScreen />}>
                <Home />
              </Suspense>
            } />
            <Route path="/settings" element={
              <Suspense fallback={<LoadingScreen />}>
                <Settings />
              </Suspense>
            } />
            <Route path="/analytics" element={
              <Suspense fallback={<LoadingScreen />}>
                <Analytics />
              </Suspense>
            } />
            <Route path="/store" element={
              <Suspense fallback={<LoadingScreen />}>
                <Store />
              </Suspense>
            } />
            <Route path="/stakes" element={
              <Suspense fallback={<LoadingScreen />}>
                <RiskParameters />
              </Suspense>
            } />
            <Route path="/help" element={
              <Suspense fallback={<LoadingScreen />}>
                <Help />
              </Suspense>
            } />
            <Route path="/integrations" element={
              <Suspense fallback={<LoadingScreen />}>
                <Integrations />
              </Suspense>
            } />
            <Route path="/inventory" element={
              <Suspense fallback={<LoadingScreen />}>
                <Inventory />
              </Suspense>
            } />
            <Route path="/leaderboard" element={
              <Suspense fallback={<LoadingScreen />}>
                <Leaderboard />
              </Suspense>
            } />
          </Routes>
        </BrowserRouter>
      </StatsProvider>
    </ThemeProvider>
  </StrictMode>,
)
